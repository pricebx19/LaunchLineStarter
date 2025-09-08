"""Custom Wagtail API configuration."""
from django.db import models
from wagtail.api.v2.views import PagesAPIViewSet
from wagtail.api.v2.filters import FieldsFilter, OrderingFilter, SearchFilter
from wagtail.api.v2.pagination import WagtailPagination

from rest_framework.response import Response

from .models import HomePage, BlogIndexPage, BlogPage


class CustomPagesAPIViewSet(PagesAPIViewSet):
    """Custom pages API with enhanced filtering and serialization."""
    
    filter_backends = [
        FieldsFilter,
        OrderingFilter,
        SearchFilter,
    ]
    
    ordering_fields = ["title", "first_published_at", "last_published_at", "date"]
    search_fields = ["title", "search_description", "intro", "content"]
    
    def get_queryset(self):
        """Return only live pages."""
        return super().get_queryset().live().public()
    
    def list_view(self, request):
        """Enhanced list view with better filtering for blog pages."""
        response = super().list_view(request)
        
        if response.status_code == 200:
            # Handle blog page filtering
            page_type = request.GET.get('type')
            if page_type == 'pages.BlogPage':
                # Filter to only blog pages and order by date
                queryset = BlogPage.objects.live().public().order_by('-date')
                
                # Apply search if provided
                search_query = request.GET.get('search')
                if search_query:
                    queryset = queryset.filter(
                        models.Q(title__icontains=search_query) |
                        models.Q(intro__icontains=search_query) |
                        models.Q(content__icontains=search_query)
                    )
                
                # Apply pagination
                paginator = self.get_paginator(queryset, request)
                page = paginator.get_page(request)
                
                # Serialize the results
                serializer = self.get_serializer(page, many=True)
                
                response.data = {
                    'items': serializer.data,
                    'meta': {
                        'total_count': paginator.count,
                        'next': self.get_next_link(page) if page.has_next() else None,
                        'previous': self.get_previous_link(page) if page.has_previous() else None,
                    }
                }
        
        return response
    
    def detail_view(self, request, pk):
        """Enhanced detail view with additional context."""
        response = super().detail_view(request, pk)
        
        # Add additional context for specific page types
        if response.status_code == 200:
            page = self.get_object()
            
            # Add blog posts for BlogIndexPage
            if isinstance(page, BlogIndexPage):
                blog_posts = BlogPage.objects.child_of(page).live().public().order_by("-first_published_at")[:10]
                response.data["blog_posts"] = [
                    {
                        "id": post.id,
                        "title": post.title,
                        "slug": post.slug,
                        "intro": post.intro,
                        "date": post.date,
                        "featured_image": post.featured_image.file.url if post.featured_image else None,
                    } for post in blog_posts
                ]
            
            # Add SEO data
            response.data["seo"] = {
                "title": page.meta_title,
                "description": page.meta_description,
                "og_image": page.og_image.file.url if hasattr(page, "og_image") and page.og_image else None,
            }
        
        return response


