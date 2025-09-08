"""Core models for LineLaunchStarter."""
from django.db import models
from django.utils import timezone
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.api import APIField


class FeatureFlag(models.Model):
    """Feature flag for controlling UI features during Wagtail transition."""

    # Feature categories for organization
    CATEGORY_CHOICES = [
        ('NAVIGATION', 'Navigation & Layout'),
        ('CONTENT', 'Content Management'),
        ('FORMS', 'Forms & Interactions'),
        ('ANIMATIONS', 'Animations & Effects'),
        ('SEO', 'SEO & Meta'),
        ('PERFORMANCE', 'Performance & Optimization'),
        ('EXPERIMENTAL', 'Experimental Features'),
    ]

    # Environment choices
    ENVIRONMENT_CHOICES = [
        ('ALL', 'All Environments'),
        ('DEVELOPMENT', 'Development Only'),
        ('STAGING', 'Staging Only'),
        ('PRODUCTION', 'Production Only'),
    ]

    # Feature flag names - these should match frontend constants
    FEATURE_CHOICES = [
        # Navigation & Layout
        ('WAGTAIL_NAVBAR', 'Wagtail Managed Navbar'),
        ('WAGTAIL_FOOTER', 'Wagtail Managed Footer'),
        ('WAGTAIL_LAYOUT', 'Wagtail Layout System'),

        # Content Management
        ('WAGTAIL_HERO', 'Wagtail Hero Sections'),
        ('WAGTAIL_FEATURES', 'Wagtail Feature Grids'),
        ('WAGTAIL_TESTIMONIALS', 'Wagtail Testimonials'),
        ('WAGTAIL_CTA', 'Wagtail CTA Sections'),
        ('WAGTAIL_BLOG', 'Wagtail Blog System'),
        ('WAGTAIL_PORTFOLIO', 'Wagtail Portfolio System'),
        ('WAGTAIL_SERVICES', 'Wagtail Services Pages'),

        # Forms & Interactions
        ('WAGTAIL_CONTACT_FORM', 'Wagtail Contact Forms'),
        ('WAGTAIL_NEWSLETTER', 'Wagtail Newsletter Signup'),

        # Animations & Effects
        ('WAGTAIL_ANIMATIONS', 'Wagtail Animation System'),
        ('WAGTAIL_PARTICLES', 'Wagtail Particle Effects'),

        # SEO & Meta
        ('WAGTAIL_SEO', 'Wagtail SEO Management'),
        ('WAGTAIL_META', 'Wagtail Meta Tags'),

        # Performance & Optimization
        ('WAGTAIL_LAZY_LOADING', 'Wagtail Lazy Loading'),
        ('WAGTAIL_CACHING', 'Wagtail Caching System'),

        # Experimental Features
        ('WAGTAIL_AI_CONTENT', 'Wagtail AI Content Generation'),
        ('WAGTAIL_ANALYTICS', 'Wagtail Analytics Integration'),
    ]

    name = models.CharField(
        max_length=100,
        choices=FEATURE_CHOICES,
        unique=True,
        help_text="Feature flag name"
    )

    display_name = models.CharField(
        max_length=200,
        help_text="Human-readable feature name"
    )

    description = models.TextField(
        blank=True,
        help_text="Detailed description of what this feature does"
    )

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='CONTENT',
        help_text="Feature category for organization"
    )

    is_enabled = models.BooleanField(
        default=False,
        help_text="Whether this feature is currently enabled"
    )

    environment = models.CharField(
        max_length=20,
        choices=ENVIRONMENT_CHOICES,
        default='ALL',
        help_text="Environment where this feature should be active"
    )

    rollout_percentage = models.IntegerField(
        default=100,
        help_text="Percentage of users who should see this feature (0-100)"
    )

    start_date = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When to start showing this feature"
    )

    end_date = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When to stop showing this feature (optional)"
    )

    dependencies = models.ManyToManyField(
        'self',
        blank=True,
        symmetrical=False,
        help_text="Other features that must be enabled for this to work"
    )

    is_deprecated = models.BooleanField(
        default=False,
        help_text="Mark as deprecated when replacing with Wagtail version"
    )

    deprecation_notes = models.TextField(
        blank=True,
        help_text="Notes about deprecation and migration"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['category', 'name']
        verbose_name = "Feature Flag"
        verbose_name_plural = "Feature Flags"

    def __str__(self):
        return f"{self.display_name} ({'Enabled' if self.is_enabled else 'Disabled'})"

    @property
    def is_active(self):
        """Check if feature should be active based on date and environment."""
        now = timezone.now()

        # Check if within date range
        if self.start_date and now < self.start_date:
            return False
        if self.end_date and now > self.end_date:
            return False

        # Check environment (simplified - you might want more complex logic)
        if self.environment != 'ALL':
            # This would need to be enhanced based on your environment
            # detection
            pass

        return self.is_enabled

    @property
    def should_show_for_user(self, user_id=None):
        """Determine if feature should be shown to a specific user."""
        if not self.is_active:
            return False

        # Simple percentage-based rollout
        if self.rollout_percentage < 100:
            # This is a simplified implementation
            # In production, you'd want more sophisticated user targeting
            import random
            return random.randint(1, 100) <= self.rollout_percentage

        return True

    def get_dependencies_status(self):
        """Check if all dependencies are enabled."""
        if not self.dependencies.exists():
            return True

        return all(dep.is_active for dep in self.dependencies.all())

    panels = [
        MultiFieldPanel([
            FieldPanel("name"),
            FieldPanel("display_name"),
            FieldPanel("description"),
            FieldPanel("category"),
        ], heading="Basic Information"),

        MultiFieldPanel([
            FieldPanel("is_enabled"),
            FieldPanel("environment"),
            FieldPanel("rollout_percentage"),
            FieldPanel("start_date"),
            FieldPanel("end_date"),
        ], heading="Activation Settings"),

        MultiFieldPanel([
            FieldPanel("dependencies"),
            FieldPanel("is_deprecated"),
            FieldPanel("deprecation_notes"),
        ], heading="Dependencies & Deprecation"),
    ]

    api_fields = [
        APIField("name"),
        APIField("display_name"),
        APIField("description"),
        APIField("category"),
        APIField("is_enabled"),
        APIField("environment"),
        APIField("rollout_percentage"),
        APIField("start_date"),
        APIField("end_date"),
        APIField("is_deprecated"),
        APIField("deprecation_notes"),
    ]
