from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from wagtail.models import Page, Site
from wagtail.rich_text import RichText
from pages.models import HomePage, AboutPage, ServicesPage, PortfolioPage, BlogIndexPage
from core.models import FeatureFlag

User = get_user_model()


class Command(BaseCommand):
    help = 'Set up Wagtail pages with sample content'

    def add_arguments(self, parser):
        parser.add_argument(
            '--force',
            action='store_true',
            help='Force recreation of existing pages',
        )

    def handle(self, *args, **options):
        self.stdout.write('Setting up Wagtail pages...')

        # Get or create superuser
        try:
            user = User.objects.filter(is_superuser=True).first()
            if not user:
                user = User.objects.create_superuser(
                    username='admin',
                    email='admin@example.com',
                    password='admin123'
                )
                self.stdout.write('  ✓ Created superuser: admin/admin123')
            else:
                self.stdout.write('  ✓ Using existing superuser')
        except Exception as e:
            self.stdout.write(f'  ❌ Error creating superuser: {e}')
            return

        # Get root page
        root = Page.get_first_root_node()
        if not root:
            self.stdout.write('  ❌ No root page found')
            return

        # Create Home Page
        self.create_home_page(root, user, options.get('force', False))

        # Create About Page
        self.create_about_page(root, user, options.get('force', False))

        # Create Services Page
        self.create_services_page(root, user, options.get('force', False))

        # Create Portfolio Page
        self.create_portfolio_page(root, user, options.get('force', False))

        # Create Blog Index Page
        self.create_blog_page(root, user, options.get('force', False))

        self.stdout.write(self.style.SUCCESS(
            'Successfully set up all Wagtail pages!'))

    def create_home_page(self, root, user, force=False):
        """Create Home Page with sample content"""
        try:
            existing = HomePage.objects.filter(slug='home').first()
            if existing and not force:
                self.stdout.write('  → Home page already exists')
                return existing

            if existing and force:
                existing.delete()

            home_page = HomePage(
                title='Home',
                slug='home',
                owner=user,
                live=True,
                show_in_menus=True,
            )

            # Add sample content
            home_page.content = [
                {
                    'type': 'hero',
                    'value': {
                        'heading': 'Welcome to LineLaunch',
                        'subheading': 'We build amazing web applications that scale',
                        'cta_text': 'Get Started',
                        'cta_link': '/contact',
                        'background_image': None,
                    }
                },
                {
                    'type': 'features',
                    'value': {
                        'heading': 'Why Choose Us',
                        'subheading': 'We deliver exceptional results',
                        'features': [
                            {
                                'title': 'Fast Development',
                                'description': 'Rapid prototyping and development',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg>'
                            },
                            {
                                'title': 'Modern Tech',
                                'description': 'Latest technologies and best practices',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
                            },
                            {
                                'title': '24/7 Support',
                                'description': 'Round-the-clock support and maintenance',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.759 8.071 16 9.007 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.532a1.5 1.5 0 00-2.219.067l-1.524 1.525a5.98 5.98 0 00.668 2.754 5.976 5.976 0 002.516.552l1.562-1.562a4.006 4.006 0 00-.078-2.183l1.562-1.562z"/></svg>'
                            }
                        ]
                    }
                },
                {
                    'type': 'statistics',
                    'value': {
                        'heading': 'Our Impact',
                        'statistics': [
                            {'label': 'Projects Completed', 'value': '150+'},
                            {'label': 'Happy Clients', 'value': '50+'},
                            {'label': 'Years Experience', 'value': '5+'},
                            {'label': 'Team Members', 'value': '12+'}
                        ]
                    }
                },
                {
                    'type': 'testimonial',
                    'value': {
                        'quote': 'LineLaunch delivered exactly what we needed, on time and within budget. Highly recommended!',
                        'author': 'Sarah Johnson',
                        'company': 'TechCorp Inc.',
                        'avatar': None
                    }
                },
                {
                    'type': 'cta',
                    'value': {
                        'heading': 'Ready to Get Started?',
                        'subheading': 'Let\'s build something amazing together',
                        'cta_text': 'Contact Us',
                        'cta_link': '/contact',
                        'background_color': 'blue'
                    }
                }
            ]

            root.add_child(instance=home_page)
            self.stdout.write('  ✓ Created Home page')
            return home_page

        except Exception as e:
            self.stdout.write(f'  ❌ Error creating Home page: {e}')

    def create_about_page(self, root, user, force=False):
        """Create About Page with sample content"""
        try:
            existing = AboutPage.objects.filter(slug='about').first()
            if existing and not force:
                self.stdout.write('  → About page already exists')
                return existing

            if existing and force:
                existing.delete()

            about_page = AboutPage(
                title='About Us',
                slug='about',
                owner=user,
                live=True,
                show_in_menus=True,
            )

            about_page.content = [
                {
                    'type': 'hero',
                    'value': {
                        'heading': 'About LineLaunch',
                        'subheading': 'We are passionate about creating exceptional digital experiences',
                        'cta_text': 'Our Team',
                        'cta_link': '#team',
                        'background_image': None,
                    }
                },
                {
                    'type': 'features',
                    'value': {
                        'heading': 'Our Values',
                        'subheading': 'What drives us forward',
                        'features': [
                            {
                                'title': 'Innovation',
                                'description': 'We embrace new technologies and creative solutions',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
                            },
                            {
                                'title': 'Quality',
                                'description': 'We never compromise on the quality of our work',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
                            },
                            {
                                'title': 'Collaboration',
                                'description': 'We work closely with our clients to achieve their goals',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg>'
                            }
                        ]
                    }
                },
                {
                    'type': 'testimonial',
                    'value': {
                        'quote': 'The team at LineLaunch truly understands our business needs and delivers exceptional results.',
                        'author': 'Michael Chen',
                        'company': 'StartupXYZ',
                        'avatar': None
                    }
                },
                {
                    'type': 'cta',
                    'value': {
                        'heading': 'Want to Work With Us?',
                        'subheading': 'We\'re always looking for talented individuals to join our team',
                        'cta_text': 'View Careers',
                        'cta_link': '/careers',
                        'background_color': 'green'
                    }
                }
            ]

            root.add_child(instance=about_page)
            self.stdout.write('  ✓ Created About page')
            return about_page

        except Exception as e:
            self.stdout.write(f'  ❌ Error creating About page: {e}')

    def create_services_page(self, root, user, force=False):
        """Create Services Page with sample content"""
        try:
            existing = ServicesPage.objects.filter(slug='services').first()
            if existing and not force:
                self.stdout.write('  → Services page already exists')
                return existing

            if existing and force:
                existing.delete()

            services_page = ServicesPage(
                title='Services',
                slug='services',
                owner=user,
                live=True,
                show_in_menus=True,
            )

            services_page.content = [
                {
                    'type': 'hero',
                    'value': {
                        'heading': 'Our Services',
                        'subheading': 'Comprehensive solutions for your digital needs',
                        'cta_text': 'Get Quote',
                        'cta_link': '/contact',
                        'background_image': None,
                    }
                },
                {
                    'type': 'service_packages',
                    'value': {
                        'heading': 'Service Packages',
                        'subheading': 'Choose the package that fits your needs',
                        'packages': [
                            {
                                'name': 'Starter',
                                'price': '$2,999',
                                'description': 'Perfect for small businesses',
                                'features': ['5 pages', 'Responsive design', 'Basic SEO', '1 month support'],
                                'cta_text': 'Get Started',
                                'cta_link': '/contact?package=starter'
                            },
                            {
                                'name': 'Professional',
                                'price': '$5,999',
                                'description': 'Ideal for growing companies',
                                'features': ['10 pages', 'Advanced features', 'SEO optimization', '3 months support'],
                                'cta_text': 'Get Started',
                                'cta_link': '/contact?package=professional',
                                'popular': True
                            },
                            {
                                'name': 'Enterprise',
                                'price': '$9,999',
                                'description': 'For large organizations',
                                'features': ['Unlimited pages', 'Custom features', 'Full SEO suite', '6 months support'],
                                'cta_text': 'Get Started',
                                'cta_link': '/contact?package=enterprise'
                            }
                        ]
                    }
                },
                {
                    'type': 'ala_carte_services',
                    'value': {
                        'heading': 'A La Carte Services',
                        'subheading': 'Additional services to enhance your project',
                        'services': [
                            {
                                'name': 'E-commerce Integration',
                                'description': 'Add online store functionality',
                                'price': '$1,500',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>'
                            },
                            {
                                'name': 'Mobile App Development',
                                'description': 'Native iOS and Android apps',
                                'price': '$3,000',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>'
                            },
                            {
                                'name': 'SEO Optimization',
                                'description': 'Improve your search rankings',
                                'price': '$800',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
                            }
                        ]
                    }
                },
                {
                    'type': 'faq_section',
                    'value': {
                        'heading': 'Frequently Asked Questions',
                        'subheading': 'Everything you need to know about our services',
                        'faqs': [
                            {
                                'question': 'How long does a typical project take?',
                                'answer': 'Most projects are completed within 4-8 weeks, depending on complexity and requirements.'
                            },
                            {
                                'question': 'Do you provide ongoing support?',
                                'answer': 'Yes, all our packages include support periods ranging from 1-6 months depending on the package.'
                            },
                            {
                                'question': 'Can you work with our existing systems?',
                                'answer': 'Absolutely! We specialize in integrating with existing systems and can work with your current infrastructure.'
                            }
                        ]
                    }
                },
                {
                    'type': 'cta',
                    'value': {
                        'heading': 'Ready to Start Your Project?',
                        'subheading': 'Get in touch to discuss your requirements',
                        'cta_text': 'Contact Us',
                        'cta_link': '/contact',
                        'background_color': 'purple'
                    }
                }
            ]

            root.add_child(instance=services_page)
            self.stdout.write('  ✓ Created Services page')
            return services_page

        except Exception as e:
            self.stdout.write(f'  ❌ Error creating Services page: {e}')

    def create_portfolio_page(self, root, user, force=False):
        """Create Portfolio Page with sample content"""
        try:
            existing = PortfolioPage.objects.filter(slug='portfolio').first()
            if existing and not force:
                self.stdout.write('  → Portfolio page already exists')
                return existing

            if existing and force:
                existing.delete()

            portfolio_page = PortfolioPage(
                title='Portfolio',
                slug='portfolio',
                owner=user,
                live=True,
                show_in_menus=True,
            )

            portfolio_page.content = [
                {
                    'type': 'hero',
                    'value': {
                        'heading': 'Our Portfolio',
                        'subheading': 'Showcasing our best work and client success stories',
                        'cta_text': 'View Projects',
                        'cta_link': '#projects',
                        'background_image': None,
                    }
                },
                {
                    'type': 'statistics',
                    'value': {
                        'heading': 'Portfolio Stats',
                        'statistics': [
                            {'label': 'Projects Delivered', 'value': '150+'},
                            {'label': 'Client Satisfaction', 'value': '98%'},
                            {'label': 'On-Time Delivery', 'value': '95%'},
                            {'label': 'Repeat Clients', 'value': '80%'}
                        ]
                    }
                },
                {
                    'type': 'portfolio_projects',
                    'value': {
                        'heading': 'Featured Projects',
                        'subheading': 'A selection of our recent work',
                        'projects': [
                            {
                                'title': 'E-commerce Platform',
                                'description': 'Modern online store with advanced features',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>',
                                'tags': ['E-commerce', 'React', 'Node.js'],
                                'package': 'Enterprise',
                                'timeline': '8 weeks',
                                'category': 'SaaS',
                                'technologies': ['React', 'Node.js', 'MongoDB', 'Stripe'],
                                'status': 'completed',
                                'visits': '50K+',
                                'conversion': '12%',
                                'performance': '95%'
                            },
                            {
                                'title': 'Mobile Banking App',
                                'description': 'Secure banking application for iOS and Android',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/></svg>',
                                'tags': ['Mobile', 'Banking', 'Security'],
                                'package': 'Professional',
                                'timeline': '12 weeks',
                                'category': 'FinTech',
                                'technologies': ['React Native', 'Node.js', 'PostgreSQL'],
                                'status': 'completed',
                                'visits': '25K+',
                                'conversion': '8%',
                                'performance': '98%'
                            }
                        ]
                    }
                },
                {
                    'type': 'case_studies',
                    'value': {
                        'heading': 'Case Studies',
                        'subheading': 'Detailed look at our successful projects',
                        'case_studies': [
                            {
                                'title': 'E-commerce Platform Success',
                                'description': 'How we helped a client increase online sales by 300%',
                                'challenge': 'Low conversion rates and poor user experience',
                                'solution': 'Complete redesign with modern UX and performance optimization',
                                'results': '300% increase in sales, 50% improvement in page load times',
                                'image': None
                            }
                        ]
                    }
                },
                {
                    'type': 'technologies',
                    'value': {
                        'heading': 'Technologies We Use',
                        'subheading': 'Modern tools and frameworks for optimal results',
                        'technologies': [
                            {
                                'name': 'React',
                                'description': 'Modern JavaScript library for building user interfaces',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
                                'category': 'Frontend'
                            },
                            {
                                'name': 'Node.js',
                                'description': 'JavaScript runtime for server-side development',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
                                'category': 'Backend'
                            },
                            {
                                'name': 'Python',
                                'description': 'Versatile programming language for web development',
                                'icon': '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
                                'category': 'Backend'
                            }
                        ]
                    }
                },
                {
                    'type': 'cta',
                    'value': {
                        'heading': 'Have a Project in Mind?',
                        'subheading': 'Let\'s discuss how we can help bring your vision to life',
                        'cta_text': 'Start a Project',
                        'cta_link': '/contact',
                        'background_color': 'blue'
                    }
                }
            ]

            root.add_child(instance=portfolio_page)
            self.stdout.write('  ✓ Created Portfolio page')
            return portfolio_page

        except Exception as e:
            self.stdout.write(f'  ❌ Error creating Portfolio page: {e}')

    def create_blog_page(self, root, user, force=False):
        """Create Blog Index Page with sample content"""
        try:
            existing = BlogIndexPage.objects.filter(slug='blog').first()
            if existing and not force:
                self.stdout.write('  → Blog page already exists')
                return existing

            if existing and force:
                existing.delete()

            blog_page = BlogIndexPage(
                title='Blog',
                slug='blog',
                owner=user,
                live=True,
                show_in_menus=True,
                intro='Welcome to our blog where we share insights, tutorials, and industry news.'
            )

            blog_page.content = [
                {
                    'type': 'hero',
                    'value': {
                        'heading': 'Our Blog',
                        'subheading': 'Insights, tutorials, and industry news',
                        'cta_text': 'Read More',
                        'cta_link': '#posts',
                        'background_image': None,
                    }
                },
                {
                    'type': 'text',
                    'value': {
                        'text': '<p>Stay updated with the latest trends in web development, design, and technology. Our team regularly shares insights and tutorials to help you stay ahead of the curve.</p>'
                    }
                },
                {
                    'type': 'cta',
                    'value': {
                        'heading': 'Subscribe to Our Newsletter',
                        'subheading': 'Get the latest posts delivered to your inbox',
                        'cta_text': 'Subscribe',
                        'cta_link': '/newsletter',
                        'background_color': 'green'
                    }
                }
            ]

            root.add_child(instance=blog_page)
            self.stdout.write('  ✓ Created Blog page')
            return blog_page

        except Exception as e:
            self.stdout.write(f'  ❌ Error creating Blog page: {e}')
