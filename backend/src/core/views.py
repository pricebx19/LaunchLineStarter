"""Core views for SEO and utility functions."""
from django.contrib.sitemaps import Sitemap
from django.http import HttpResponse
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from wagtail.models import Page

from pages.models import BlogPage


class PageSitemap(Sitemap):
    """Sitemap for Wagtail pages."""
    
    changefreq = "weekly"
    priority = 0.8
    
    def items(self):
        """Return all live, public pages."""
        return Page.objects.live().public().order_by("-last_published_at")
    
    def lastmod(self, obj):
        """Return last modification date."""
        return obj.last_published_at
    
    def location(self, obj):
        """Return page URL."""
        return obj.url
    
    def priority(self, obj):
        """Return priority based on page type."""
        if obj.depth == 2:  # Root pages (Home, About, etc.)
            return 1.0
        elif hasattr(obj, 'date'):  # Blog posts
            return 0.7
        return 0.8


class BlogSitemap(Sitemap):
    """Sitemap specifically for blog posts."""
    
    changefreq = "weekly"
    priority = 0.7
    
    def items(self):
        """Return all published blog posts."""
        return BlogPage.objects.live().public().order_by("-date")
    
    def lastmod(self, obj):
        """Return blog post date."""
        return obj.date
    
    def location(self, obj):
        """Return blog post URL."""
        return obj.url


@cache_page(60 * 60 * 24)  # Cache for 24 hours
def robots_txt(request):
    """Generate robots.txt file."""
    lines = [
        "User-agent: *",
    ]
    
    # Allow all for non-production
    if request.get_host() in ['localhost:8000', '127.0.0.1:8000']:
        lines.append("Disallow: /")
    else:
        lines.extend([
            "Allow: /",
            "Disallow: /cms/",
            "Disallow: /admin/",
            "Disallow: /api/v2/",
            "",
            f"Sitemap: {request.build_absolute_uri('/sitemap.xml')}",
        ])
    
    return HttpResponse("\n".join(lines), content_type="text/plain")


def security_txt(request):
    """Generate security.txt file."""
    lines = [
        "Contact: mailto:security@launchline.io",
        "Expires: 2025-12-31T23:59:59.000Z",
        "Encryption: https://keybase.io/launchline/pgp_keys.asc",
        "Preferred-Languages: en",
        "Canonical: https://launchline.io/.well-known/security.txt",
    ]
    
    return HttpResponse("\n".join(lines), content_type="text/plain")