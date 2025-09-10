"""Wagtail page models for LaunchLine Starter."""
from django.db import models
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.api import APIField
from wagtail.fields import StreamField
from wagtail.models import Page
from wagtail.search import index

from .blocks import (
    HeroBlock,
    FeatureGridBlock,
    TestimonialBlock,
    CTABlock,
    TextBlock,
    ImageBlock,
    ContactInfoBlock,
    SocialLinksBlock,
    MetricsBlock,
    ServicePackagesBlock,
    AlaCarteServicesBlock,
    FAQSectionBlock,
    PortfolioProjectsBlock,
    CaseStudiesBlock,
    TechnologiesBlock,
    # Advanced blocks
    VideoBlock,
    GalleryBlock,
    CodeBlock,
    AccordionBlock,
    TabsBlock,
    PricingTableBlock,
    TimelineBlock,
    ComparisonTableBlock,
    FormBlock,
    MapBlock,
    ProgressBarBlock,
)


class SEOMixin(models.Model):
    """SEO fields for pages."""

    og_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Open Graph image for social media sharing"
    )

    seo_panels = [
        MultiFieldPanel([
            FieldPanel("og_image"),
        ], heading="SEO")
    ]

    api_fields = [
        APIField("og_image"),
    ]

    @property
    def meta_title(self):
        """Return SEO title or fallback to page title."""
        return self.seo_title or self.title

    @property
    def meta_description(self):
        """Return search description."""
        return self.search_description

    class Meta:
        abstract = True


class HomePage(SEOMixin, Page):
    """Home page with hero, features, testimonials and CTA sections."""

    # Hero section
    hero_heading = models.CharField(
        max_length=255, help_text="Main hero heading")
    hero_subheading = models.TextField(
        max_length=500,
        blank=True,
        help_text="Optional hero subheading"
    )
    hero_cta_text = models.CharField(
        max_length=100,
        blank=True,
        help_text="Hero CTA button text"
    )
    hero_cta_link = models.URLField(
        blank=True,
        help_text="Hero CTA button URL"
    )
    hero_background_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Hero background image"
    )

    # Content sections
    content = StreamField([
        ("features", FeatureGridBlock()),
        ("testimonial", TestimonialBlock()),
        ("cta", CTABlock()),
        ("text", TextBlock()),
        ("image", ImageBlock()),
    ], blank=True, use_json_field=True)

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel("hero_heading"),
            FieldPanel("hero_subheading"),
            FieldPanel("hero_cta_text"),
            FieldPanel("hero_cta_link"),
            FieldPanel("hero_background_image"),
        ], heading="Hero Section"),
        FieldPanel("content"),
    ]

    promote_panels = Page.promote_panels + SEOMixin.seo_panels

    search_fields = Page.search_fields + [
        index.SearchField("hero_heading"),
        index.SearchField("hero_subheading"),
        index.SearchField("content"),
    ]
    api_fields = [
        APIField("hero_heading"),
        APIField("hero_subheading"),
        APIField("hero_cta_text"),
        APIField("hero_cta_link"),
        APIField("hero_background_image"),
        APIField("content"),
    ] + SEOMixin.api_fields

    max_count = 1  # Only one home page

    class Meta:
        verbose_name = "Home Page"


class ContactPage(SEOMixin, Page):
    """Contact page with 100% StreamField content."""

    # Main content using StreamField
    content = StreamField([
        ("hero", HeroBlock()),
        ("contact_info", ContactInfoBlock()),
        ("social_links", SocialLinksBlock()),
        ("metrics", MetricsBlock()),
        ("text", TextBlock()),
        ("cta", CTABlock()),
        ("image", ImageBlock()),
    ], blank=True, use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel("content"),
    ]

    promote_panels = Page.promote_panels + SEOMixin.seo_panels

    search_fields = Page.search_fields + [
        index.SearchField("content"),
    ]

    api_fields = [
        APIField("content"),
    ] + SEOMixin.api_fields

    max_count = 1  # Only one contact page

    class Meta:
        verbose_name = "Contact Page"

    def get_context(self, request):
        """Add default values for social links and metrics if not set."""
        context = super().get_context(request)

        # Extract social links and metrics from StreamField content
        social_links = []
        metrics = []

        for block in self.content:
            if block.block_type == 'social_links':
                social_links = block.value.get('social_links', [])
            elif block.block_type == 'metrics':
                metrics = block.value.get('metrics', [])

        # Default social links if none found
        if not social_links:
            social_links = [
                {
                    "name": "LinkedIn",
                    "url": "https://linkedin.com/company/launchline",
                    "icon": "linkedin"
                },
                {
                    "name": "Twitter",
                    "url": "https://twitter.com/launchline",
                    "icon": "twitter"
                },
                {
                    "name": "GitHub",
                    "url": "https://github.com/launchline",
                    "icon": "github"
                }
            ]

        # Default metrics if none found
        if not metrics:
            metrics = [
                {"value": "150+", "label": "Projects Completed"},
                {"value": "98%", "label": "Client Satisfaction"},
                {"value": "24h", "label": "Response Time"},
                {"value": "5★", "label": "Average Rating"}
            ]

        context['social_links'] = social_links
        context['metrics'] = metrics

        return context


class StandardPage(SEOMixin, Page):
    """Standard content page with StreamField."""

    intro = models.TextField(
        max_length=500,
        blank=True,
        help_text="Optional page introduction"
    )

    content = StreamField([
        # Core content blocks
        ("hero", HeroBlock()),
        ("features", FeatureGridBlock()),
        ("testimonial", TestimonialBlock()),
        ("cta", CTABlock()),
        ("text", TextBlock()),
        ("image", ImageBlock()),
        ("statistics", MetricsBlock()),

        # Service blocks
        ("service_packages", ServicePackagesBlock()),
        ("ala_carte_services", AlaCarteServicesBlock()),
        ("faq_section", FAQSectionBlock()),

        # Portfolio blocks
        ("portfolio_projects", PortfolioProjectsBlock()),
        ("case_studies", CaseStudiesBlock()),
        ("technologies", TechnologiesBlock()),

        # Contact blocks
        ("contact_info", ContactInfoBlock()),
        ("social_links", SocialLinksBlock()),

        # Advanced blocks
        ("video", VideoBlock()),
        ("gallery", GalleryBlock()),
        ("code", CodeBlock()),
        ("accordion", AccordionBlock()),
        ("tabs", TabsBlock()),
        ("pricing_table", PricingTableBlock()),
        ("timeline", TimelineBlock()),
        ("comparison_table", ComparisonTableBlock()),
        ("form", FormBlock()),
        ("map", MapBlock()),
        ("progress_bars", ProgressBarBlock()),
    ], blank=True, use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("content"),
    ]

    promote_panels = Page.promote_panels + SEOMixin.seo_panels

    search_fields = Page.search_fields + [
        index.SearchField("intro"),
        index.SearchField("content"),
    ]

    api_fields = [
        APIField("intro"),
        APIField("content"),
    ] + SEOMixin.api_fields

    class Meta:
        verbose_name = "Standard Page"


class BlogIndexPage(SEOMixin, Page):
    """Blog index page with StreamField content and blog posts listing."""

    # Main content using StreamField
    content = StreamField([
        ("hero", HeroBlock()),
        ("text", TextBlock()),
        ("cta", CTABlock()),
        ("image", ImageBlock()),
    ], blank=True, use_json_field=True)

    # Legacy intro field for backward compatibility
    intro = models.TextField(
        max_length=500,
        blank=True,
        help_text="Optional blog introduction (legacy field)"
    )

    content_panels = Page.content_panels + [
        FieldPanel("content"),
        FieldPanel("intro"),
    ]

    promote_panels = Page.promote_panels + SEOMixin.seo_panels

    search_fields = Page.search_fields + [
        index.SearchField("intro"),
        index.SearchField("content"),
    ]

    api_fields = [
        APIField("content"),
        APIField("intro"),
        APIField("blog_posts"),
    ] + SEOMixin.api_fields

    @property
    def blog_posts(self):
        """Return published blog posts."""
        return BlogPage.objects.child_of(self).live().public().order_by("-first_published_at")

    def get_context(self, request):
        """Add blog posts to template context."""
        context = super().get_context(request)
        context["blog_posts"] = self.blog_posts
        return context

    max_count = 1  # Only one blog index

    class Meta:
        verbose_name = "Blog Index Page"


class BlogPage(SEOMixin, Page):
    """Individual blog post page."""

    date = models.DateField("Post date", auto_now_add=True)
    intro = models.TextField(
        max_length=500,
        help_text="Blog post introduction/excerpt"
    )
    featured_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Featured image for the blog post"
    )

    content = StreamField([
        ("text", TextBlock()),
        ("image", ImageBlock()),
        ("cta", CTABlock()),
    ], use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("featured_image"),
        FieldPanel("content"),
    ]

    promote_panels = Page.promote_panels + SEOMixin.seo_panels

    search_fields = Page.search_fields + [
        index.SearchField("intro"),
        index.SearchField("content"),
    ]

    api_fields = [
        APIField("date"),
        APIField("intro"),
        APIField("featured_image"),
        APIField("content"),
    ] + SEOMixin.api_fields

    parent_page_types = ["BlogIndexPage"]

    class Meta:
        verbose_name = "Blog Page"
        ordering = ["-date"]


class ServicesPage(SEOMixin, Page):
    """Services page with 100% StreamField content."""

    # Main content using StreamField
    content = StreamField([
        ("hero", HeroBlock()),
        ("service_packages", ServicePackagesBlock()),
        ("ala_carte_services", AlaCarteServicesBlock()),
        ("faq_section", FAQSectionBlock()),
        ("cta", CTABlock()),
        ("text", TextBlock()),
        ("image", ImageBlock()),
    ], blank=True, use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel("content"),
    ]

    promote_panels = Page.promote_panels + SEOMixin.seo_panels

    search_fields = Page.search_fields + [
        index.SearchField("content"),
    ]

    api_fields = [
        APIField("content"),
    ] + SEOMixin.api_fields

    max_count = 1  # Only one services page

    class Meta:
        verbose_name = "Services Page"


class HomePage(SEOMixin, Page):
    """Home page with 100% StreamField content."""

    # Main content using StreamField
    content = StreamField([
        ("hero", HeroBlock()),
        ("features", FeatureGridBlock()),
        ("statistics", MetricsBlock()),
        ("testimonial", TestimonialBlock()),
        ("cta", CTABlock()),
        ("text", TextBlock()),
        ("image", ImageBlock()),
    ], blank=True, use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel("content"),
    ]

    promote_panels = Page.promote_panels + SEOMixin.seo_panels

    search_fields = Page.search_fields + [
        index.SearchField("content"),
    ]

    api_fields = [
        APIField("content"),
    ] + SEOMixin.api_fields

    max_count = 1  # Only one home page

    class Meta:
        verbose_name = "Home Page"


class AboutPage(SEOMixin, Page):
    """About page with 100% StreamField content."""

    # Main content using StreamField
    content = StreamField([
        ("hero", HeroBlock()),
        ("features", FeatureGridBlock()),
        ("testimonial", TestimonialBlock()),
        ("cta", CTABlock()),
        ("text", TextBlock()),
        ("image", ImageBlock()),
    ], blank=True, use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel("content"),
    ]

    promote_panels = Page.promote_panels + SEOMixin.seo_panels

    search_fields = Page.search_fields + [
        index.SearchField("content"),
    ]

    api_fields = [
        APIField("content"),
    ] + SEOMixin.api_fields

    max_count = 1  # Only one about page

    class Meta:
        verbose_name = "About Page"


class PortfolioPage(SEOMixin, Page):
    """Portfolio page with 100% StreamField content."""

    # Main content using StreamField
    content = StreamField([
        ("hero", HeroBlock()),
        ("statistics", MetricsBlock()),
        ("portfolio_projects", PortfolioProjectsBlock()),
        ("case_studies", CaseStudiesBlock()),
        ("technologies", TechnologiesBlock()),
        ("cta", CTABlock()),
        ("text", TextBlock()),
        ("image", ImageBlock()),
    ], blank=True, use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel("content"),
    ]

    promote_panels = Page.promote_panels + SEOMixin.seo_panels

    search_fields = Page.search_fields + [
        index.SearchField("content"),
    ]

    api_fields = [
        APIField("content"),
    ] + SEOMixin.api_fields

    max_count = 1  # Only one portfolio page

    class Meta:
        verbose_name = "Portfolio Page"
