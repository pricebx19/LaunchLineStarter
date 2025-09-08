"""Wagtail admin configuration for core app."""
from wagtail.admin.panels import (
    FieldPanel,
    MultiFieldPanel,
    ObjectList,
    TabbedInterface
)
from wagtail.admin.views.generic import CreateView, EditView, IndexView
from wagtail.admin.viewsets.model import ModelViewSet
from wagtail.permission_policies.base import ModelPermissionPolicy

from .models import FeatureFlag


class FeatureFlagPermissionPolicy(ModelPermissionPolicy):
    """Custom permission policy for feature flags."""
    model = FeatureFlag


class FeatureFlagCreateView(CreateView):
    """Custom create view for feature flags."""
    pass


class FeatureFlagEditView(EditView):
    """Custom edit view for feature flags."""
    pass


class FeatureFlagIndexView(IndexView):
    """Custom index view for feature flags with category filtering."""

    def get_queryset(self):
        queryset = super().get_queryset()

        # Add category filtering
        category = self.request.GET.get('category')
        if category:
            queryset = queryset.filter(category=category)

        # Add environment filtering
        environment = self.request.GET.get('environment')
        if environment:
            queryset = queryset.filter(environment=environment)

        # Add status filtering
        status = self.request.GET.get('status')
        if status == 'enabled':
            queryset = queryset.filter(is_enabled=True)
        elif status == 'disabled':
            queryset = queryset.filter(is_enabled=False)
        elif status == 'deprecated':
            queryset = queryset.filter(is_deprecated=True)

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Add filter options to context
        context['categories'] = FeatureFlag.CATEGORY_CHOICES
        context['environments'] = FeatureFlag.ENVIRONMENT_CHOICES
        context['status_choices'] = [
            ('enabled', 'Enabled'),
            ('disabled', 'Disabled'),
            ('deprecated', 'Deprecated'),
        ]

        # Add counts for dashboard
        context['total_flags'] = FeatureFlag.objects.count()
        context['enabled_flags'] = FeatureFlag.objects.filter(
            is_enabled=True
        ).count()
        context['deprecated_flags'] = FeatureFlag.objects.filter(
            is_deprecated=True
        ).count()

        return context


class FeatureFlagViewSet(ModelViewSet):
    """ViewSet for managing feature flags in Wagtail admin."""

    model = FeatureFlag
    icon = 'cog'  # Wagtail icon
    menu_label = 'Feature Flags'
    menu_name = 'feature-flags'
    menu_order = 300
    add_to_settings_menu = True

    create_view_class = FeatureFlagCreateView
    edit_view_class = FeatureFlagEditView
    index_view_class = FeatureFlagIndexView

    permission_policy = FeatureFlagPermissionPolicy(FeatureFlag)

    list_display = [
        'display_name',
        'name',
        'category',
        'is_enabled',
        'environment',
        'is_deprecated'
    ]

    list_filter = ['category', 'is_enabled', 'environment', 'is_deprecated']
    search_fields = ['name', 'display_name', 'description']

    edit_handler = TabbedInterface([
        ObjectList([
            MultiFieldPanel([
                FieldPanel("name"),
                FieldPanel("display_name"),
                FieldPanel("description"),
                FieldPanel("category"),
            ], heading="Basic Information"),
        ], heading="General"),

        ObjectList([
            MultiFieldPanel([
                FieldPanel("is_enabled"),
                FieldPanel("environment"),
                FieldPanel("rollout_percentage"),
                FieldPanel("start_date"),
                FieldPanel("end_date"),
            ], heading="Activation Settings"),
        ], heading="Settings"),

        ObjectList([
            MultiFieldPanel([
                FieldPanel("dependencies"),
                FieldPanel("is_deprecated"),
                FieldPanel("deprecation_notes"),
            ], heading="Dependencies & Migration"),
        ], heading="Advanced"),
    ])


# Register the viewset
feature_flag_viewset = FeatureFlagViewSet('feature_flags')
