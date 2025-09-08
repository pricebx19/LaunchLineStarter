"""Management command to set up initial feature flags for Wagtail transition."""
from django.core.management.base import BaseCommand
from core.models import FeatureFlag


class Command(BaseCommand):
    help = 'Set up initial feature flags for Wagtail transition'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Reset all feature flags (delete and recreate)',
        )
        parser.add_argument(
            '--enable-all',
            action='store_true',
            help='Enable all Wagtail features (for testing)',
        )

    def handle(self, *args, **options):
        if options['reset']:
            self.stdout.write('Deleting existing feature flags...')
            FeatureFlag.objects.all().delete()

        self.stdout.write('Creating feature flags...')

        # Navigation & Layout flags
        self.create_feature_flag(
            'WAGTAIL_NAVBAR',
            'Wagtail Managed Navbar',
            'Replace Vue.js navbar with Wagtail-managed navigation',
            'NAVIGATION',
            enabled=options.get('enable_all', False)
        )

        self.create_feature_flag(
            'WAGTAIL_FOOTER',
            'Wagtail Managed Footer',
            'Replace Vue.js footer with Wagtail-managed footer content',
            'NAVIGATION',
            enabled=options.get('enable_all', False)
        )

        self.create_feature_flag(
            'WAGTAIL_LAYOUT',
            'Wagtail Layout System',
            'Use Wagtail for complete page layout management',
            'NAVIGATION',
            enabled=options.get('enable_all', False)
        )

        # Content Management flags
        self.create_feature_flag(
            'WAGTAIL_HERO',
            'Wagtail Hero Sections',
            'Use Wagtail StreamField for hero sections instead of hardcoded Vue components',
            'CONTENT',
            enabled=options.get('enable_all', False)
        )

        self.create_feature_flag(
            'WAGTAIL_FEATURES',
            'Wagtail Feature Grids',
            'Manage feature grid content through Wagtail admin',
            'CONTENT',
            enabled=options.get('enable_all', False)
        )

        self.create_feature_flag(
            'WAGTAIL_TESTIMONIALS',
            'Wagtail Testimonials',
            'Manage testimonial content through Wagtail CMS',
            'CONTENT',
            enabled=options.get('enable_all', False)
        )

        self.create_feature_flag(
            'WAGTAIL_CTA',
            'Wagtail CTA Sections',
            'Use Wagtail for call-to-action section management',
            'CONTENT',
            enabled=options.get('enable_all', False)
        )

        self.create_feature_flag(
            'WAGTAIL_BLOG',
            'Wagtail Blog System',
            'Replace Vue.js blog pages with Wagtail blog functionality',
            'CONTENT',
            enabled=options.get('enable_all', False)
        )

        self.create_feature_flag(
            'WAGTAIL_PORTFOLIO',
            'Wagtail Portfolio System',
            'Manage portfolio content through Wagtail',
            'CONTENT',
            enabled=options.get('enable_all', False)
        )

        self.create_feature_flag(
            'WAGTAIL_SERVICES',
            'Wagtail Services Pages',
            'Use Wagtail for services page management',
            'CONTENT',
            enabled=options.get('enable_all', False)
        )

        # Forms & Interactions flags
        self.create_feature_flag(
            'WAGTAIL_CONTACT_FORM',
            'Wagtail Contact Forms',
            'Use Wagtail form builder for contact forms',
            'FORMS',
            enabled=options.get('enable_all', False)
        )

        self.create_feature_flag(
            'WAGTAIL_NEWSLETTER',
            'Wagtail Newsletter Signup',
            'Manage newsletter signup through Wagtail',
            'FORMS',
            enabled=options.get('enable_all', False)
        )

        # SEO & Meta flags
        self.create_feature_flag(
            'WAGTAIL_SEO',
            'Wagtail SEO Management',
            'Use Wagtail for SEO meta tag management',
            'SEO',
            enabled=options.get('enable_all', False)
        )

        self.create_feature_flag(
            'WAGTAIL_META',
            'Wagtail Meta Tags',
            'Manage Open Graph and meta tags through Wagtail',
            'SEO',
            enabled=options.get('enable_all', False)
        )

        # Animations & Effects flags
        self.create_feature_flag(
            'WAGTAIL_ANIMATIONS',
            'Wagtail Animation System',
            'Configure animations and transitions through Wagtail',
            'ANIMATIONS',
            enabled=options.get('enable_all', False)
        )

        self.create_feature_flag(
            'WAGTAIL_PARTICLES',
            'Wagtail Particle Effects',
            'Control particle effects and background animations via Wagtail',
            'ANIMATIONS',
            enabled=options.get('enable_all', False)
        )

        # Performance & Optimization flags
        self.create_feature_flag(
            'WAGTAIL_LAZY_LOADING',
            'Wagtail Lazy Loading',
            'Use Wagtail image lazy loading and optimization',
            'PERFORMANCE',
            enabled=options.get('enable_all', False)
        )

        self.create_feature_flag(
            'WAGTAIL_CACHING',
            'Wagtail Caching System',
            'Implement Wagtail page caching strategies',
            'PERFORMANCE',
            enabled=options.get('enable_all', False)
        )

        # Experimental flags
        self.create_feature_flag(
            'WAGTAIL_AI_CONTENT',
            'Wagtail AI Content Generation',
            'Experimental AI-powered content generation features',
            'EXPERIMENTAL',
            enabled=options.get('enable_all', False)
        )

        self.create_feature_flag(
            'WAGTAIL_ANALYTICS',
            'Wagtail Analytics Integration',
            'Advanced analytics integration through Wagtail',
            'EXPERIMENTAL',
            enabled=options.get('enable_all', False)
        )

        # Set up some dependencies
        self.setup_dependencies()

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created {FeatureFlag.objects.count()} feature flags'
            )
        )

    def create_feature_flag(self, name, display_name, description, category, enabled=False):
        """Create a feature flag if it doesn't exist."""
        flag, created = FeatureFlag.objects.get_or_create(
            name=name,
            defaults={
                'display_name': display_name,
                'description': description,
                'category': category,
                'is_enabled': enabled,
                'environment': 'ALL',
                'rollout_percentage': 100,
            }
        )

        if created:
            self.stdout.write(f'  ✓ Created: {display_name}')
        else:
            self.stdout.write(f'  → Exists: {display_name}')

        return flag

    def setup_dependencies(self):
        """Set up feature flag dependencies."""
        self.stdout.write('Setting up dependencies...')

        try:
            # Layout depends on navbar and footer
            layout_flag = FeatureFlag.objects.get(name='WAGTAIL_LAYOUT')
            navbar_flag = FeatureFlag.objects.get(name='WAGTAIL_NAVBAR')
            footer_flag = FeatureFlag.objects.get(name='WAGTAIL_FOOTER')

            layout_flag.dependencies.add(navbar_flag, footer_flag)
            self.stdout.write('  ✓ Layout depends on navbar and footer')

            # SEO depends on meta
            seo_flag = FeatureFlag.objects.get(name='WAGTAIL_SEO')
            meta_flag = FeatureFlag.objects.get(name='WAGTAIL_META')

            seo_flag.dependencies.add(meta_flag)
            self.stdout.write('  ✓ SEO depends on meta tags')

            # Caching depends on lazy loading
            caching_flag = FeatureFlag.objects.get(name='WAGTAIL_CACHING')
            lazy_flag = FeatureFlag.objects.get(name='WAGTAIL_LAZY_LOADING')

            caching_flag.dependencies.add(lazy_flag)
            self.stdout.write('  ✓ Caching depends on lazy loading')

        except FeatureFlag.DoesNotExist as e:
            self.stdout.write(
                self.style.WARNING(f'Could not set up some dependencies: {e}')
            )
