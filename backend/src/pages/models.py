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
)


class SEOMixin(models.Model):
    """SEO fields for pages."""
    
    seo_title = models.CharField(
        max_length=60,
        blank=True,
        help_text="SEO title (60 chars max). Falls back to page title if empty."
    )
    search_description = models.TextField(
        max_length=160,
        blank=True,
        help_text="SEO meta description (160 chars max)"
    )
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
            FieldPanel("seo_title"),
            FieldPanel("search_description"),
            FieldPanel("og_image"),
        ], heading="SEO")
    ]
    
    api_fields = [
        APIField("seo_title"),
        APIField("search_description"),
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
    hero_heading = models.CharField(max_length=255, help_text="Main hero heading")
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
    
    api_fields = Page.api_fields + [
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


class StandardPage(SEOMixin, Page):
    """Standard content page with StreamField."""
    
    intro = models.TextField(
        max_length=500,
        blank=True,
        help_text="Optional page introduction"
    )
    
    content = StreamField([
        ("hero", HeroBlock()),
        ("features", FeatureGridBlock()),
        ("testimonial", TestimonialBlock()),
        ("cta", CTABlock()),
        ("text", TextBlock()),
        ("image", ImageBlock()),
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
    
    api_fields = Page.api_fields + [
        APIField("intro"),
        APIField("content"),
    ] + SEOMixin.api_fields
    
    class Meta:
        verbose_name = "Standard Page"


class BlogIndexPage(SEOMixin, Page):
    """Blog index page listing blog posts."""
    
    intro = models.TextField(
        max_length=500,
        blank=True,
        help_text="Optional blog introduction"
    )
    
    content_panels = Page.content_panels + [
        FieldPanel("intro"),
    ]
    
    promote_panels = Page.promote_panels + SEOMixin.seo_panels
    
    search_fields = Page.search_fields + [
        index.SearchField("intro"),
    ]
    
    api_fields = Page.api_fields + [
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
        FieldPanel("date"),
        FieldPanel("intro"),
        FieldPanel("featured_image"),
        FieldPanel("content"),
    ]
    
    promote_panels = Page.promote_panels + SEOMixin.seo_panels
    
    search_fields = Page.search_fields + [
        index.SearchField("intro"),
        index.SearchField("content"),
    ]
    
    api_fields = Page.api_fields + [
        APIField("date"),
        APIField("intro"),
        APIField("featured_image"),
        APIField("content"),
    ] + SEOMixin.api_fields
    
    parent_page_types = ["BlogIndexPage"]
    
    class Meta:
        verbose_name = "Blog Page"
        ordering = ["-date"]