"""SEO helper utilities for LaunchLine Starter."""
from django.conf import settings
from django.contrib.sites.models import Site
from django.template.loader import render_to_string
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from wagtail.models import Page


def get_canonical_url(page: Page, request=None) -> str:
    """Get canonical URL for a page."""
    if request:
        return page.get_full_url(request)
    
    # Fallback to site domain
    site = page.get_site()
    if site:
        return f"https://{site.hostname}{page.url}"
    
    return f"https://example.com{page.url}"


def get_meta_title(page: Page) -> str:
    """Get meta title for a page."""
    if hasattr(page, 'seo_title') and page.seo_title:
        return page.seo_title
    return page.title


def get_meta_description(page: Page) -> str:
    """Get meta description for a page."""
    if hasattr(page, 'search_description') and page.search_description:
        return page.search_description
    
    # Fallback to intro field if available
    if hasattr(page, 'intro') and page.intro:
        return page.intro[:160]
    
    return ""


def get_og_image_url(page: Page, request=None) -> str:
    """Get Open Graph image URL for a page."""
    if hasattr(page, 'og_image') and page.og_image:
        if request:
            return page.og_image.get_rendition('width-1200').url
        return page.og_image.file.url
    
    # Fallback to featured image for blog posts
    if hasattr(page, 'featured_image') and page.featured_image:
        if request:
            return page.featured_image.get_rendition('width-1200').url
        return page.featured_image.file.url
    
    # Fallback to hero background image for home page
    if hasattr(page, 'hero_background_image') and page.hero_background_image:
        if request:
            return page.hero_background_image.get_rendition('width-1200').url
        return page.hero_background_image.file.url
    
    return ""


def generate_meta_tags(page: Page, request=None) -> str:
    """Generate HTML meta tags for a page."""
    canonical_url = get_canonical_url(page, request)
    meta_title = get_meta_title(page)
    meta_description = get_meta_description(page)
    og_image_url = get_og_image_url(page, request)
    
    # Get absolute OG image URL
    if og_image_url and not og_image_url.startswith('http'):
        site = page.get_site()
        if site:
            og_image_url = f"https://{site.hostname}{og_image_url}"
        else:
            og_image_url = f"https://example.com{og_image_url}"
    
    tags = [
        f'<meta name="description" content="{meta_description}">',
        f'<link rel="canonical" href="{canonical_url}">',
        f'<meta property="og:title" content="{meta_title}">',
        f'<meta property="og:description" content="{meta_description}">',
        f'<meta property="og:url" content="{canonical_url}">',
        f'<meta property="og:type" content="website">',
        f'<meta property="og:site_name" content="{getattr(settings, "WAGTAIL_SITE_NAME", "LaunchLine")}">',
    ]
    
    if og_image_url:
        tags.extend([
            f'<meta property="og:image" content="{og_image_url}">',
            f'<meta property="og:image:width" content="1200">',
            f'<meta property="og:image:height" content="630">',
        ])
    
    # Twitter Card tags
    tags.extend([
        f'<meta name="twitter:card" content="summary_large_image">',
        f'<meta name="twitter:title" content="{meta_title}">',
        f'<meta name="twitter:description" content="{meta_description}">',
    ])
    
    if og_image_url:
        tags.append(f'<meta name="twitter:image" content="{og_image_url}">')
    
    return mark_safe('\n    '.join(tags))


def get_structured_data(page: Page, request=None) -> dict:
    """Generate JSON-LD structured data for a page."""
    canonical_url = get_canonical_url(page, request)
    
    # Base organization data
    organization = {
        "@type": "Organization",
        "@id": f"{canonical_url}#organization",
        "name": getattr(settings, "WAGTAIL_SITE_NAME", "LaunchLine"),
        "url": canonical_url,
        "sameAs": [],
    }
    
    # Base webpage data
    webpage = {
        "@type": "WebPage",
        "@id": f"{canonical_url}#webpage",
        "url": canonical_url,
        "name": get_meta_title(page),
        "description": get_meta_description(page),
        "publisher": {"@id": f"{canonical_url}#organization"},
        "inLanguage": "en-US",
        "datePublished": page.first_published_at.isoformat() if page.first_published_at else None,
        "dateModified": page.last_published_at.isoformat() if page.last_published_at else None,
    }
    
    # Blog-specific structured data
    if hasattr(page, 'date') and page.date:  # BlogPage
        webpage.update({
            "@type": "BlogPosting",
            "headline": page.title,
            "datePublished": page.date.isoformat(),
            "author": {
                "@type": "Organization",
                "@id": f"{canonical_url}#organization",
            },
        })
    
    return {
        "@context": "https://schema.org",
        "@graph": [organization, webpage]
    }


class SEOTemplateTags:
    """Template tag-style functions for SEO."""
    
    @staticmethod
    def meta_tags(page: Page, request=None) -> str:
        """Generate meta tags for templates."""
        return generate_meta_tags(page, request)
    
    @staticmethod
    def page_title(page: Page) -> str:
        """Get formatted page title."""
        site_name = getattr(settings, "WAGTAIL_SITE_NAME", "LaunchLine")
        meta_title = get_meta_title(page)
        
        if meta_title and meta_title != site_name:
            return f"{meta_title} | {site_name}"
        return site_name
    
    @staticmethod
    def structured_data_json(page: Page, request=None) -> str:
        """Get JSON-LD structured data as HTML script tag."""
        import json
        data = get_structured_data(page, request)
        json_data = json.dumps(data, indent=2)
        return format_html(
            '<script type="application/ld+json">{}</script>',
            mark_safe(json_data)
        )