"""API views for core app including feature flags."""
import hashlib
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import FeatureFlag


class FeatureFlagsAPIView(View):
    """API endpoint for retrieving feature flags."""

    def get(self, request):
        """Get all active feature flags."""
        # Apply caching only in production (not in DEBUG mode)
        if not settings.DEBUG:
            # Use method_decorator to apply caching dynamically
            cached_get = method_decorator(cache_page(60 * 5))(self._get_flags)
            return cached_get(request)
        else:
            # No caching in development
            return self._get_flags(request)

    def _get_flags(self, request):
        """Internal method to get feature flags without caching."""
        flags = {}

        # Get all feature flags
        feature_flags = FeatureFlag.objects.all()

        for flag in feature_flags:
            # Basic flag data
            flag_data = {
                'name': flag.name,
                'display_name': flag.display_name,
                'description': flag.description,
                'category': flag.category,
                'is_enabled': flag.is_enabled,
                'is_active': flag.is_active,
                'environment': flag.environment,
                'rollout_percentage': flag.rollout_percentage,
                'is_deprecated': flag.is_deprecated,
                'deprecation_notes': flag.deprecation_notes,
                'dependencies_met': flag.get_dependencies_status(),
            }

            # Check if user should see this flag
            user_id = request.GET.get('user_id')
            if user_id:
                # Create a consistent hash for the user
                user_hash = hashlib.md5(
                    f"{user_id}{flag.name}".encode()).hexdigest()
                user_number = int(user_hash[:8], 16) % 100 + 1
                flag_data['should_show_for_user'] = user_number <= flag.rollout_percentage
            else:
                flag_data['should_show_for_user'] = flag.rollout_percentage == 100

            # Only include if dependencies are met and flag should show
            if flag_data['dependencies_met'] and flag_data['should_show_for_user']:
                flags[flag.name] = flag_data['is_active']

        # Add metadata
        response_data = {
            'flags': flags,
            'metadata': {
                'total_flags': len(flags),
                'cache_ttl': 0 if settings.DEBUG else 300,  # No cache in DEBUG mode
                'environment': 'development' if settings.DEBUG else 'production',
                'caching_enabled': not settings.DEBUG,
            }
        }

        return JsonResponse(response_data)


@api_view(['GET'])
def feature_flag_detail(request, flag_name):
    """Get detailed information about a specific feature flag."""
    try:
        flag = FeatureFlag.objects.get(name=flag_name)
    except FeatureFlag.DoesNotExist:
        return Response({
            'error': 'Feature flag not found',
            'flag_name': flag_name
        }, status=404)

    user_id = request.GET.get('user_id')

    # Create detailed response
    response_data = {
        'name': flag.name,
        'display_name': flag.display_name,
        'description': flag.description,
        'category': flag.category,
        'is_enabled': flag.is_enabled,
        'is_active': flag.is_active,
        'environment': flag.environment,
        'rollout_percentage': flag.rollout_percentage,
        'start_date': flag.start_date,
        'end_date': flag.end_date,
        'is_deprecated': flag.is_deprecated,
        'deprecation_notes': flag.deprecation_notes,
        'dependencies': [dep.name for dep in flag.dependencies.all()],
        'dependencies_met': flag.get_dependencies_status(),
        'created_at': flag.created_at,
        'updated_at': flag.updated_at,
    }

    # Check user-specific rollout
    if user_id:
        user_hash = hashlib.md5(f"{user_id}{flag.name}".encode()).hexdigest()
        user_number = int(user_hash[:8], 16) % 100 + 1
        response_data['should_show_for_user'] = user_number <= flag.rollout_percentage
    else:
        response_data['should_show_for_user'] = flag.rollout_percentage == 100

    return Response(response_data)


@api_view(['GET'])
def feature_flags_by_category(request, category):
    """Get feature flags filtered by category."""
    flags = FeatureFlag.objects.filter(category=category)

    response_data = {
        'category': category,
        'flags': {}
    }

    for flag in flags:
        if flag.is_active and flag.get_dependencies_status():
            response_data['flags'][flag.name] = {
                'display_name': flag.display_name,
                'description': flag.description,
                'is_enabled': flag.is_enabled,
                'is_deprecated': flag.is_deprecated,
            }

    return Response(response_data)


@csrf_exempt
@api_view(['POST'])
def toggle_feature_flag(request, flag_name):
    """Toggle a feature flag (admin only)."""
    if not request.user.is_staff:
        return Response({
            'error': 'Permission denied'
        }, status=403)

    try:
        flag = FeatureFlag.objects.get(name=flag_name)
    except FeatureFlag.DoesNotExist:
        return Response({
            'error': 'Feature flag not found',
            'flag_name': flag_name
        }, status=404)

    # Toggle the flag
    flag.is_enabled = not flag.is_enabled
    flag.save()

    return Response({
        'flag_name': flag.name,
        'is_enabled': flag.is_enabled,
        'message': f'Feature flag {flag.name} {"enabled" if flag.is_enabled else "disabled"}'
    })


@api_view(['GET'])
def wagtail_transition_status(request):
    """Get overall status of Wagtail transition."""
    all_flags = FeatureFlag.objects.all()

    # Group by category
    categories = {}
    for flag in all_flags:
        if flag.category not in categories:
            categories[flag.category] = {
                'total': 0,
                'enabled': 0,
                'deprecated': 0,
                'flags': []
            }

        categories[flag.category]['total'] += 1
        if flag.is_enabled:
            categories[flag.category]['enabled'] += 1
        if flag.is_deprecated:
            categories[flag.category]['deprecated'] += 1

        categories[flag.category]['flags'].append({
            'name': flag.name,
            'display_name': flag.display_name,
            'is_enabled': flag.is_enabled,
            'is_deprecated': flag.is_deprecated,
        })

    # Calculate overall progress
    total_flags = all_flags.count()
    enabled_flags = all_flags.filter(is_enabled=True).count()
    deprecated_flags = all_flags.filter(is_deprecated=True).count()

    progress_percentage = (enabled_flags / total_flags *
                           100) if total_flags > 0 else 0

    return Response({
        'overall_progress': {
            'total_flags': total_flags,
            'enabled_flags': enabled_flags,
            'deprecated_flags': deprecated_flags,
            'progress_percentage': round(progress_percentage, 2),
        },
        'categories': categories,
        'next_steps': _get_migration_recommendations(categories)
    })


def _get_migration_recommendations(categories):
    """Generate recommendations for the next migration steps."""
    recommendations = []

    # Prioritize categories with low adoption
    for category, data in categories.items():
        if data['total'] > 0:
            enabled_percentage = (data['enabled'] / data['total']) * 100

            if enabled_percentage < 25:
                recommendations.append({
                    'priority': 'high',
                    'category': category,
                    'message': f"Consider enabling more {category} features - only {enabled_percentage:.0f}% enabled"
                })
            elif enabled_percentage < 50:
                recommendations.append({
                    'priority': 'medium',
                    'category': category,
                    'message': f"{category} migration in progress - {enabled_percentage:.0f}% complete"
                })
            elif enabled_percentage > 90:
                recommendations.append({
                    'priority': 'low',
                    'category': category,
                    'message': f"{category} migration nearly complete - consider deprecating old components"
                })

    return recommendations
