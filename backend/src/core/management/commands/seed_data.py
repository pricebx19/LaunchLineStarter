"""Management command to seed the database with initial content."""
import json
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.sites.models import Site
from wagtail.models import Page, Site as WagtailSite

from pages.models import HomePage, StandardPage, BlogIndexPage, BlogPage
from leads.models import Lead

User = get_user_model()


class Command(BaseCommand):
    """Seed the database with initial content for LaunchLine Starter."""
    
    help = "Seed the database with initial pages and sample content"
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Delete existing content before seeding',
        )
        parser.add_argument(
            '--no-sample-data',
            action='store_true',
            help='Skip creating sample blog posts and leads',
        )
    
    def handle(self, *args, **options):
        """Handle the command execution."""
        self.stdout.write(
            self.style.SUCCESS('🚀 Starting LaunchLine Starter seed process...')
        )
        
        if options['reset']:
            self.reset_content()
        
        self.create_site()
        self.create_pages()
        
        if not options['no_sample_data']:
            self.create_sample_content()
        
        self.stdout.write(
            self.style.SUCCESS('✅ Seed process completed successfully!')
        )
    
    def reset_content(self):
        """Reset existing content."""
        self.stdout.write('🗑️ Resetting existing content...')
        
        # Delete all pages except root
        Page.objects.filter(depth__gt=1).delete()
        
        # Delete sample leads
        Lead.objects.filter(name__startswith='Sample').delete()
        
        self.stdout.write(self.style.WARNING('   Content reset complete'))
    
    def create_site(self):
        """Create or update the Wagtail site."""
        self.stdout.write('🌐 Setting up site configuration...')
        
        # Get or create the root page
        root = Page.objects.filter(depth=1).first()
        if not root:
            root = Page.add_root(
                title='LaunchLine Starter',
                slug='root'
            )
        
        # Create or update Wagtail site
        wagtail_site, created = WagtailSite.objects.get_or_create(
            hostname='localhost',
            defaults={
                'port': 8000,
                'site_name': 'LaunchLine Starter',
                'root_page': root,
                'is_default_site': True,
            }
        )
        
        if not created:
            wagtail_site.site_name = 'LaunchLine Starter'
            wagtail_site.root_page = root
            wagtail_site.is_default_site = True
            wagtail_site.save()
        
        # Update Django site
        django_site = Site.objects.get(pk=1)
        django_site.domain = 'localhost:8000'
        django_site.name = 'LaunchLine Starter'
        django_site.save()
        
        self.stdout.write(self.style.SUCCESS('   Site configuration complete'))
    
    def create_pages(self):
        """Create the page structure."""
        self.stdout.write('📄 Creating page structure...')
        
        root = Page.objects.filter(depth=1).first()
        
        # Create Home Page
        home_page = self.create_home_page(root)
        
        # Create About Page
        self.create_about_page(home_page)
        
        # Create Services Page
        self.create_services_page(home_page)
        
        # Create Blog Index and Posts
        blog_index = self.create_blog_index(home_page)
        
        # Create Contact Page
        self.create_contact_page(home_page)
        
        self.stdout.write(self.style.SUCCESS('   Page structure complete'))
    
    def create_home_page(self, root):
        """Create the home page with sample content."""
        try:
            home = HomePage.objects.get()
            self.stdout.write('   Home page already exists, updating...')
        except HomePage.DoesNotExist:
            home = HomePage(
                title='LaunchLine',
                slug='home',
                hero_heading='Launch Your Next Big Idea',
                hero_subheading='Professional starter templates and development services to get your project off the ground faster.',
                hero_cta_text='Get Started',
                hero_cta_link='https://launchline.io/contact',
                seo_title='LaunchLine - Professional Starter Templates',
                search_description='Professional starter templates and development services for modern web applications. Built with Django, React, Vue, and more.',
            )
            root.add_child(instance=home)
            home.save_revision().publish()
            self.stdout.write('   ✅ Home page created')
        
        # Add content blocks
        if not home.content:
            features_content = [
                {
                    'icon': 'rocket',
                    'title': 'Fast Setup',
                    'description': 'Get your project running in minutes with our pre-configured templates.'
                },
                {
                    'icon': 'shield',
                    'title': 'Production Ready',
                    'description': 'Built with best practices, security, and performance in mind.'
                },
                {
                    'icon': 'code',
                    'title': 'Modern Stack',
                    'description': 'Latest technologies including Django, React, Vue, and TypeScript.'
                }
            ]
            
            home.content = json.dumps([
                {
                    'type': 'features',
                    'value': {
                        'heading': 'Why Choose LaunchLine?',
                        'subheading': 'Everything you need to build modern web applications',
                        'features': features_content
                    }
                },
                {
                    'type': 'testimonial',
                    'value': {
                        'quote': 'LaunchLine saved us months of development time. The templates are clean, well-documented, and production-ready.',
                        'author_name': 'Sarah Chen',
                        'author_title': 'CTO',
                        'company': 'TechStart Inc.'
                    }
                },
                {
                    'type': 'cta',
                    'value': {
                        'heading': 'Ready to Launch?',
                        'text': 'Start building your next project today with our professional templates.',
                        'button_text': 'Browse Templates',
                        'button_link': 'https://launchline.io/templates',
                        'background_color': 'primary'
                    }
                }
            ])
            home.save()
        
        return home
    
    def create_about_page(self, parent):
        """Create the about page."""
        try:
            about = StandardPage.objects.get(slug='about')
            self.stdout.write('   About page already exists')
        except StandardPage.DoesNotExist:
            about = StandardPage(
                title='About Us',
                slug='about',
                intro='Learn more about LaunchLine and our mission to help developers build better applications faster.',
                seo_title='About LaunchLine - Our Story',
                search_description='Learn about LaunchLine\'s mission to provide professional starter templates and development services.',
            )
            parent.add_child(instance=about)
            about.save_revision().publish()
            self.stdout.write('   ✅ About page created')
    
    def create_services_page(self, parent):
        """Create the services page."""
        try:
            services = StandardPage.objects.get(slug='services')
            self.stdout.write('   Services page already exists')
        except StandardPage.DoesNotExist:
            services = StandardPage(
                title='Services',
                slug='services',
                intro='Professional development services and consulting to help you succeed.',
                seo_title='Development Services - LaunchLine',
                search_description='Custom development services, consulting, and support for modern web applications.',
            )
            parent.add_child(instance=services)
            services.save_revision().publish()
            self.stdout.write('   ✅ Services page created')
    
    def create_blog_index(self, parent):
        """Create the blog index page."""
        try:
            blog = BlogIndexPage.objects.get(slug='blog')
            self.stdout.write('   Blog index already exists')
        except BlogIndexPage.DoesNotExist:
            blog = BlogIndexPage(
                title='Blog',
                slug='blog',
                intro='Insights, tutorials, and updates from the LaunchLine team.',
                seo_title='Blog - LaunchLine',
                search_description='Latest insights, tutorials, and updates about web development and modern technologies.',
            )
            parent.add_child(instance=blog)
            blog.save_revision().publish()
            self.stdout.write('   ✅ Blog index created')
        
        return blog
    
    def create_contact_page(self, parent):
        """Create the contact page."""
        try:
            contact = StandardPage.objects.get(slug='contact')
            self.stdout.write('   Contact page already exists')
        except StandardPage.DoesNotExist:
            contact = StandardPage(
                title='Contact',
                slug='contact',
                intro='Get in touch with our team. We\'d love to hear about your project.',
                seo_title='Contact Us - LaunchLine',
                search_description='Contact LaunchLine for custom development services, support, or general inquiries.',
            )
            parent.add_child(instance=contact)
            contact.save_revision().publish()
            self.stdout.write('   ✅ Contact page created')
    
    def create_sample_content(self):
        """Create sample blog posts and leads."""
        self.stdout.write('📝 Creating sample content...')
        
        # Create sample blog posts
        blog_index = BlogIndexPage.objects.first()
        if blog_index:
            self.create_sample_blog_posts(blog_index)
        
        # Create sample leads
        self.create_sample_leads()
        
        self.stdout.write(self.style.SUCCESS('   Sample content complete'))
    
    def create_sample_blog_posts(self, blog_index):
        """Create sample blog posts."""
        posts = [
            {
                'title': 'Getting Started with LaunchLine',
                'slug': 'getting-started-with-launchline',
                'intro': 'Learn how to use LaunchLine starter templates to accelerate your development process.',
                'content': json.dumps([
                    {
                        'type': 'text',
                        'value': {
                            'content': '<h2>Welcome to LaunchLine</h2><p>LaunchLine provides professional starter templates that help you build modern web applications faster. This guide will walk you through the basics of using our templates.</p><h3>What You\'ll Get</h3><ul><li>Production-ready codebase</li><li>Modern development setup</li><li>Best practices built-in</li><li>Comprehensive documentation</li></ul>'
                        }
                    }
                ])
            },
            {
                'title': 'Modern Web Development Best Practices',
                'slug': 'modern-web-development-best-practices',
                'intro': 'Essential practices for building scalable and maintainable web applications in 2024.',
                'content': json.dumps([
                    {
                        'type': 'text',
                        'value': {
                            'content': '<h2>Building for Scale</h2><p>Modern web development requires careful attention to performance, security, and maintainability. Here are the key practices we follow at LaunchLine.</p><h3>Key Areas</h3><ul><li>Code organization and structure</li><li>Testing strategies</li><li>Performance optimization</li><li>Security considerations</li><li>Deployment and monitoring</li></ul>'
                        }
                    }
                ])
            }
        ]
        
        for post_data in posts:
            try:
                BlogPage.objects.get(slug=post_data['slug'])
                continue  # Skip if exists
            except BlogPage.DoesNotExist:
                post = BlogPage(**post_data)
                blog_index.add_child(instance=post)
                post.save_revision().publish()
                self.stdout.write(f'   ✅ Blog post created: {post.title}')
    
    def create_sample_leads(self):
        """Create sample leads."""
        leads = [
            {
                'name': 'Sample Lead 1',
                'email': 'sample1@example.com',
                'message': 'This is a sample lead message for testing purposes. I\'m interested in learning more about your starter templates.',
                'source': 'website'
            },
            {
                'name': 'Sample Lead 2',
                'email': 'sample2@example.com',
                'message': 'I\'d like to discuss a custom development project. Do you offer consulting services?',
                'source': 'demo_request'
            }
        ]
        
        for lead_data in leads:
            if not Lead.objects.filter(email=lead_data['email']).exists():
                Lead.objects.create(**lead_data)
                self.stdout.write(f'   ✅ Sample lead created: {lead_data["name"]}')