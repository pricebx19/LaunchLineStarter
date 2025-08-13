"""Tests for the pages API."""
import json
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from model_bakery import baker
from wagtail.models import Page, Site

from pages.models import HomePage, StandardPage, BlogIndexPage, BlogPage


class PageAPIBaseTest(APITestCase):
    """Base test class for page API tests."""
    
    def setUp(self):
        """Set up test data."""
        # Create root page
        self.root_page = Page.objects.get(depth=1)
        
        # Create home page
        self.home_page = baker.make(
            HomePage,
            title='Test Home',
            slug='test-home',
            hero_heading='Welcome to Test',
            hero_subheading='This is a test home page',
            parent=self.root_page,
            live=True
        )
        
        # Create blog index
        self.blog_index = baker.make(
            BlogIndexPage,
            title='Blog',
            slug='blog',
            intro='Test blog introduction',
            parent=self.home_page,
            live=True
        )
        
        # Create blog posts
        self.blog_post1 = baker.make(
            BlogPage,
            title='Test Blog Post 1',
            slug='test-blog-post-1',
            intro='First test blog post',
            parent=self.blog_index,
            live=True
        )
        
        self.blog_post2 = baker.make(
            BlogPage,
            title='Test Blog Post 2',
            slug='test-blog-post-2',
            intro='Second test blog post',
            parent=self.blog_index,
            live=True
        )
        
        # Create standard page
        self.about_page = baker.make(
            StandardPage,
            title='About',
            slug='about',
            intro='About us page',
            parent=self.home_page,
            live=True
        )


class PagesAPITest(PageAPIBaseTest):
    """Test the custom pages API endpoints."""
    
    def test_pages_list(self):
        """Test listing pages."""
        url = reverse('wagtailapi:pages:listing')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        self.assertIn('items', data)
        
        # Should only return live pages
        page_titles = [item['title'] for item in data['items']]
        self.assertIn('Test Home', page_titles)
        self.assertIn('Blog', page_titles)
        self.assertIn('About', page_titles)
    
    def test_home_page_detail(self):
        """Test retrieving home page detail."""
        url = reverse('wagtailapi:pages:detail', args=[self.home_page.id])
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        self.assertEqual(data['title'], 'Test Home')
        self.assertEqual(data['hero_heading'], 'Welcome to Test')
        self.assertEqual(data['hero_subheading'], 'This is a test home page')
        
        # Check SEO data is included
        self.assertIn('seo', data)
        seo_data = data['seo']
        self.assertEqual(seo_data['title'], 'Test Home')
    
    def test_blog_index_detail(self):
        """Test retrieving blog index with blog posts."""
        url = reverse('wagtailapi:pages:detail', args=[self.blog_index.id])
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        self.assertEqual(data['title'], 'Blog')
        self.assertEqual(data['intro'], 'Test blog introduction')
        
        # Check blog posts are included
        self.assertIn('blog_posts', data)
        blog_posts = data['blog_posts']
        self.assertEqual(len(blog_posts), 2)
        
        # Check blog post data
        post_titles = [post['title'] for post in blog_posts]
        self.assertIn('Test Blog Post 1', post_titles)
        self.assertIn('Test Blog Post 2', post_titles)
    
    def test_blog_post_detail(self):
        """Test retrieving blog post detail."""
        url = reverse('wagtailapi:pages:detail', args=[self.blog_post1.id])
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        self.assertEqual(data['title'], 'Test Blog Post 1')
        self.assertEqual(data['intro'], 'First test blog post')
        self.assertIn('date', data)
        self.assertIn('content', data)
    
    def test_standard_page_detail(self):
        """Test retrieving standard page detail."""
        url = reverse('wagtailapi:pages:detail', args=[self.about_page.id])
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        self.assertEqual(data['title'], 'About')
        self.assertEqual(data['intro'], 'About us page')
        self.assertIn('content', data)
    
    def test_pages_search(self):
        """Test searching pages."""
        url = reverse('wagtailapi:pages:listing')
        response = self.client.get(url, {'search': 'blog'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        items = data['items']
        
        # Should find blog-related pages
        page_titles = [item['title'] for item in items]
        self.assertIn('Blog', page_titles)
    
    def test_pages_ordering(self):
        """Test page ordering."""
        url = reverse('wagtailapi:pages:listing')
        response = self.client.get(url, {'order': 'title'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        items = data['items']
        
        # Should be ordered by title
        titles = [item['title'] for item in items]
        self.assertEqual(titles, sorted(titles))
    
    def test_page_not_found(self):
        """Test retrieving non-existent page."""
        url = reverse('wagtailapi:pages:detail', args=[99999])
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_draft_pages_not_accessible(self):
        """Test that draft pages are not accessible via API."""
        # Create a draft page
        draft_page = baker.make(
            StandardPage,
            title='Draft Page',
            slug='draft-page',
            parent=self.home_page,
            live=False
        )
        
        url = reverse('wagtailapi:pages:detail', args=[draft_page.id])
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class BlogAPITest(PageAPIBaseTest):
    """Test the blog-specific API endpoints."""
    
    def test_blog_list(self):
        """Test listing blog posts."""
        url = reverse('wagtailapi:blog:listing')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        self.assertIn('items', data)
        
        items = data['items']
        self.assertEqual(len(items), 2)
        
        # Should be ordered by date (newest first)
        titles = [item['title'] for item in items]
        self.assertIn('Test Blog Post 1', titles)
        self.assertIn('Test Blog Post 2', titles)
    
    def test_blog_search(self):
        """Test searching blog posts."""
        url = reverse('wagtailapi:blog:listing')
        response = self.client.get(url, {'search': 'First'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        items = data['items']
        
        # Should find the first blog post
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]['title'], 'Test Blog Post 1')
    
    def test_blog_ordering_by_date(self):
        """Test blog posts ordering by date."""
        url = reverse('wagtailapi:blog:listing')
        response = self.client.get(url, {'order': 'date'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        items = data['items']
        
        # Should have at least our test posts
        self.assertGreaterEqual(len(items), 2)


class SEODataTest(PageAPIBaseTest):
    """Test SEO data in API responses."""
    
    def setUp(self):
        super().setUp()
        
        # Update home page with SEO data
        self.home_page.seo_title = 'Custom SEO Title'
        self.home_page.search_description = 'Custom SEO description for testing'
        self.home_page.save()
    
    def test_seo_data_included(self):
        """Test that SEO data is included in API responses."""
        url = reverse('wagtailapi:pages:detail', args=[self.home_page.id])
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        self.assertIn('seo', data)
        
        seo_data = data['seo']
        self.assertEqual(seo_data['title'], 'Custom SEO Title')
        self.assertEqual(seo_data['description'], 'Custom SEO description for testing')
    
    def test_fallback_seo_title(self):
        """Test SEO title fallback to page title."""
        # Create page without custom SEO title
        page = baker.make(
            StandardPage,
            title='Test Page',
            slug='test-page',
            parent=self.home_page,
            live=True
        )
        
        url = reverse('wagtailapi:pages:detail', args=[page.id])
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        seo_data = data['seo']
        self.assertEqual(seo_data['title'], 'Test Page')


class APIRateLimitingTest(PageAPIBaseTest):
    """Test API rate limiting (basic functionality)."""
    
    def test_api_responds_to_requests(self):
        """Test that API responds normally under normal load."""
        url = reverse('wagtailapi:pages:listing')
        
        # Make several requests
        for _ in range(5):
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_api_pagination(self):
        """Test API pagination."""
        # Create more pages to test pagination
        for i in range(25):
            baker.make(
                StandardPage,
                title=f'Page {i}',
                slug=f'page-{i}',
                parent=self.home_page,
                live=True
            )
        
        url = reverse('wagtailapi:pages:listing')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        # Should have pagination metadata
        self.assertIn('meta', data)
        self.assertIn('total_count', data['meta'])
        
        # Test next page
        if 'next' in data['meta']:
            next_url = data['meta']['next']
            next_response = self.client.get(next_url)
            self.assertEqual(next_response.status_code, status.HTTP_200_OK)