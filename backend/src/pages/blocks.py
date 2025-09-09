"""StreamField blocks for Wagtail pages."""
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock


class HeroBlock(blocks.StructBlock):
    """Hero block with heading, subheading, CTA and background image."""

    heading = blocks.CharBlock(max_length=255, help_text="Main hero heading")
    subheading = blocks.TextBlock(
        required=False,
        max_length=500,
        help_text="Optional subheading text"
    )
    cta_text = blocks.CharBlock(
        max_length=100,
        required=False,
        help_text="Call to action button text"
    )
    cta_link = blocks.URLBlock(
        required=False,
        help_text="Call to action button URL"
    )
    background_image = ImageChooserBlock(
        required=False,
        help_text="Background image for the hero section"
    )

    class Meta:
        template = "blocks/hero_block.html"
        icon = "image"
        label = "Hero Section"


class FeatureBlock(blocks.StructBlock):
    """Single feature with icon, title and description."""

    icon = blocks.CharBlock(
        max_length=50,
        help_text="Icon class or name (e.g., 'rocket', 'star')"
    )
    title = blocks.CharBlock(max_length=100, help_text="Feature title")
    description = blocks.TextBlock(help_text="Feature description")

    class Meta:
        icon = "pick"


class FeatureGridBlock(blocks.StructBlock):
    """Grid of features with optional heading."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        help_text="Section heading"
    )
    subheading = blocks.TextBlock(
        required=False,
        max_length=500,
        help_text="Optional section subheading"
    )
    features = blocks.ListBlock(
        FeatureBlock(),
        min_num=2,
        max_num=6,
        help_text="Add 2-6 features"
    )

    class Meta:
        template = "blocks/feature_grid_block.html"
        icon = "list-ul"
        label = "Feature Grid"


class TestimonialBlock(blocks.StructBlock):
    """Customer testimonial with quote, author and company."""

    quote = blocks.TextBlock(help_text="Customer testimonial quote")
    author_name = blocks.CharBlock(max_length=100, help_text="Author name")
    author_title = blocks.CharBlock(
        max_length=100,
        required=False,
        help_text="Author job title"
    )
    company = blocks.CharBlock(
        max_length=100,
        required=False,
        help_text="Company name"
    )
    author_image = ImageChooserBlock(
        required=False,
        help_text="Author photo"
    )

    class Meta:
        template = "blocks/testimonial_block.html"
        icon = "openquote"
        label = "Testimonial"


class CTABlock(blocks.StructBlock):
    """Call-to-action section with heading, text and button."""

    heading = blocks.CharBlock(max_length=255, help_text="CTA heading")
    text = blocks.TextBlock(
        required=False,
        max_length=500,
        help_text="Supporting text"
    )
    button_text = blocks.CharBlock(max_length=100, help_text="Button text")
    button_link = blocks.URLBlock(help_text="Button URL")
    background_color = blocks.ChoiceBlock(
        choices=[
            ("primary", "Primary"),
            ("secondary", "Secondary"),
            ("dark", "Dark"),
            ("light", "Light"),
        ],
        default="primary",
        help_text="Background color theme"
    )

    class Meta:
        template = "blocks/cta_block.html"
        icon = "plus-inverse"
        label = "Call to Action"


class TextBlock(blocks.StructBlock):
    """Rich text content block."""

    content = blocks.RichTextBlock(
        help_text="Rich text content",
        features=[
            "h2", "h3", "h4", "bold", "italic", "link",
            "ol", "ul", "document-link", "image", "embed"
        ]
    )

    class Meta:
        template = "blocks/text_block.html"
        icon = "doc-full"
        label = "Rich Text"


class ImageBlock(blocks.StructBlock):
    """Image with optional caption."""

    image = ImageChooserBlock(help_text="Select an image")
    caption = blocks.CharBlock(
        max_length=255,
        required=False,
        help_text="Optional image caption"
    )
    alignment = blocks.ChoiceBlock(
        choices=[
            ("left", "Left"),
            ("center", "Center"),
            ("right", "Right"),
        ],
        default="center",
        help_text="Image alignment"
    )

    class Meta:
        template = "blocks/image_block.html"
        icon = "image"
        label = "Image"


class ContactInfoBlock(blocks.StructBlock):
    """Contact information block with company details and contact methods."""

    company_name = blocks.CharBlock(
        max_length=100,
        default="LaunchLine LLC",
        help_text="Company name"
    )
    company_description = blocks.TextBlock(
        max_length=500,
        default="We're passionate about creating digital experiences that drive results. Whether you're a startup with a bold vision or an established business ready to innovate, let's collaborate to bring your ideas to life.",
        help_text="Company description"
    )
    phone = blocks.CharBlock(
        max_length=20,
        default="+1 (555) 123-4567",
        help_text="Phone number"
    )
    email = blocks.EmailBlock(
        default="hello@launchline.com",
        help_text="Email address"
    )
    address_line_1 = blocks.CharBlock(
        max_length=100,
        default="123 Innovation Drive",
        help_text="Address line 1"
    )
    address_line_2 = blocks.CharBlock(
        max_length=100,
        default="Tech City, TC 12345",
        help_text="Address line 2"
    )

    class Meta:
        template = "blocks/contact_info_block.html"
        icon = "mail"
        label = "Contact Information"


class SocialLinkBlock(blocks.StructBlock):
    """Single social media link."""

    name = blocks.CharBlock(
        max_length=50,
        help_text="Social platform name (e.g., LinkedIn, Twitter)"
    )
    url = blocks.URLBlock(
        help_text="Social media profile URL"
    )
    icon = blocks.CharBlock(
        max_length=50,
        help_text="Icon name (e.g., linkedin, twitter, github)"
    )

    class Meta:
        icon = "link"


class SocialLinksBlock(blocks.StructBlock):
    """Social media links section."""

    heading = blocks.CharBlock(
        max_length=100,
        required=False,
        default="Connect With Us",
        help_text="Section heading"
    )
    social_links = blocks.ListBlock(
        SocialLinkBlock(),
        min_num=1,
        max_num=10,
        help_text="Add social media links"
    )

    class Meta:
        template = "blocks/social_links_block.html"
        icon = "group"
        label = "Social Media Links"


class MetricBlock(blocks.StructBlock):
    """Single metric with value and label."""

    value = blocks.CharBlock(
        max_length=20,
        help_text="Metric value (e.g., 150+, 98%, 24h)"
    )
    label = blocks.CharBlock(
        max_length=100,
        help_text="Metric label (e.g., Projects Completed)"
    )

    class Meta:
        icon = "tick"


class MetricsBlock(blocks.StructBlock):
    """Metrics section for displaying key statistics."""

    heading = blocks.CharBlock(
        max_length=100,
        required=False,
        default="Our Impact",
        help_text="Section heading"
    )
    metrics = blocks.ListBlock(
        MetricBlock(),
        min_num=2,
        max_num=6,
        help_text="Add 2-6 metrics"
    )

    class Meta:
        template = "blocks/metrics_block.html"
        icon = "chart-line"
        label = "Metrics"


# Service-specific blocks
class ServicePackageBlock(blocks.StructBlock):
    """Single service package with pricing and features."""

    title = blocks.CharBlock(max_length=100, help_text="Package title")
    description = blocks.TextBlock(
        max_length=500,
        help_text="Package description"
    )
    price = blocks.CharBlock(
        max_length=50,
        help_text="Price (e.g., 'From $2,500')"
    )
    duration = blocks.CharBlock(
        max_length=50,
        help_text="Duration (e.g., '2 weeks')"
    )
    icon = blocks.RawHTMLBlock(
        help_text="SVG icon HTML code"
    )
    features = blocks.ListBlock(
        blocks.CharBlock(max_length=200),
        min_num=1,
        max_num=10,
        help_text="Package features"
    )

    class Meta:
        icon = "tick"
        label = "Service Package"


class AlaCarteServiceBlock(blocks.StructBlock):
    """Single a la carte service item."""

    title = blocks.CharBlock(max_length=100, help_text="Service title")
    description = blocks.TextBlock(
        max_length=300,
        help_text="Service description"
    )
    price = blocks.CharBlock(
        max_length=50,
        help_text="Price (e.g., '$350')"
    )
    icon = blocks.RawHTMLBlock(
        help_text="SVG icon HTML code"
    )
    category = blocks.CharBlock(
        max_length=50,
        help_text="Service category (e.g., 'Design', 'Development')"
    )
    features = blocks.ListBlock(
        blocks.CharBlock(max_length=200),
        min_num=1,
        max_num=8,
        help_text="Service features"
    )
    popular = blocks.BooleanBlock(
        required=False,
        help_text="Mark as popular service"
    )

    class Meta:
        icon = "list-ul"
        label = "A La Carte Service"


class FAQBlock(blocks.StructBlock):
    """Single FAQ item."""

    question = blocks.CharBlock(
        max_length=200,
        help_text="FAQ question"
    )
    answer = blocks.TextBlock(
        max_length=1000,
        help_text="FAQ answer"
    )

    class Meta:
        icon = "help"
        label = "FAQ Item"


class ServicePackagesBlock(blocks.StructBlock):
    """Service packages section."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        default="Choose Your Perfect Package",
        help_text="Section heading"
    )
    subheading = blocks.TextBlock(
        max_length=500,
        required=False,
        help_text="Section subheading"
    )
    packages = blocks.ListBlock(
        ServicePackageBlock(),
        min_num=1,
        max_num=5,
        help_text="Add service packages"
    )

    class Meta:
        template = "blocks/service_packages_block.html"
        icon = "list-ul"
        label = "Service Packages"


class AlaCarteServicesBlock(blocks.StructBlock):
    """A la carte services section."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        default="A La Carte Services",
        help_text="Section heading"
    )
    subheading = blocks.TextBlock(
        max_length=500,
        required=False,
        help_text="Section subheading"
    )
    services = blocks.ListBlock(
        AlaCarteServiceBlock(),
        min_num=1,
        max_num=20,
        help_text="Add a la carte services"
    )

    class Meta:
        template = "blocks/ala_carte_services_block.html"
        icon = "list-ul"
        label = "A La Carte Services"


class FAQSectionBlock(blocks.StructBlock):
    """FAQ section."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        default="Frequently Asked Questions",
        help_text="Section heading"
    )
    subheading = blocks.TextBlock(
        max_length=500,
        required=False,
        help_text="Section subheading"
    )
    faqs = blocks.ListBlock(
        FAQBlock(),
        min_num=1,
        max_num=15,
        help_text="Add FAQ items"
    )

    class Meta:
        template = "blocks/faq_section_block.html"
        icon = "help"
        label = "FAQ Section"


# Portfolio-specific blocks
class ProjectBlock(blocks.StructBlock):
    """Single portfolio project."""

    title = blocks.CharBlock(max_length=100, help_text="Project title")
    description = blocks.TextBlock(
        max_length=500,
        help_text="Project description"
    )
    icon = blocks.RawHTMLBlock(
        help_text="SVG icon HTML code"
    )
    tags = blocks.ListBlock(
        blocks.CharBlock(max_length=50),
        min_num=1,
        max_num=8,
        help_text="Project tags"
    )
    package = blocks.CharBlock(
        max_length=50,
        help_text="Package type (e.g., 'Starter', 'Pro', 'Elite')"
    )
    timeline = blocks.CharBlock(
        max_length=50,
        help_text="Project timeline (e.g., '2 weeks', '4-6 weeks')"
    )
    category = blocks.CharBlock(
        max_length=50,
        help_text="Project category (e.g., 'SaaS', 'E-Commerce')"
    )
    image = ImageChooserBlock(
        required=False,
        help_text="Project image"
    )
    technologies = blocks.ListBlock(
        blocks.CharBlock(max_length=50),
        min_num=1,
        max_num=10,
        help_text="Technologies used"
    )
    status = blocks.ChoiceBlock(
        choices=[
            ("completed", "Completed"),
            ("in-progress", "In Progress"),
            ("featured", "Featured"),
        ],
        default="completed",
        help_text="Project status"
    )
    visits = blocks.CharBlock(
        max_length=50,
        required=False,
        help_text="Visits metric (e.g., '10K+')"
    )
    conversion = blocks.CharBlock(
        max_length=50,
        required=False,
        help_text="Conversion metric (e.g., '25%')"
    )
    performance = blocks.CharBlock(
        max_length=50,
        required=False,
        help_text="Performance metric (e.g., '98%')"
    )

    class Meta:
        icon = "image"
        label = "Portfolio Project"


class CaseStudyBlock(blocks.StructBlock):
    """Single case study."""

    title = blocks.CharBlock(max_length=100, help_text="Case study title")
    business = blocks.CharBlock(
        max_length=100,
        help_text="Business name"
    )
    icon = blocks.RawHTMLBlock(
        help_text="SVG icon HTML code"
    )
    metric1_value = blocks.CharBlock(
        max_length=50,
        help_text="First metric value"
    )
    metric1_label = blocks.CharBlock(
        max_length=100,
        help_text="First metric label"
    )
    metric2_value = blocks.CharBlock(
        max_length=50,
        help_text="Second metric value"
    )
    metric2_label = blocks.CharBlock(
        max_length=100,
        help_text="Second metric label"
    )
    description = blocks.TextBlock(
        max_length=1000,
        help_text="Case study description"
    )
    package = blocks.CharBlock(
        max_length=50,
        help_text="Package used"
    )
    timeline = blocks.CharBlock(
        max_length=50,
        help_text="Project timeline"
    )
    testimonial = blocks.TextBlock(
        max_length=500,
        required=False,
        help_text="Client testimonial"
    )
    client = blocks.CharBlock(
        max_length=100,
        required=False,
        help_text="Client name"
    )

    class Meta:
        icon = "doc-full"
        label = "Case Study"


class TechnologyBlock(blocks.StructBlock):
    """Single technology."""

    name = blocks.CharBlock(max_length=50, help_text="Technology name")
    icon = blocks.RawHTMLBlock(
        help_text="SVG icon HTML code"
    )

    class Meta:
        icon = "cog"
        label = "Technology"


class PortfolioProjectsBlock(blocks.StructBlock):
    """Portfolio projects section."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        default="Our Portfolio",
        help_text="Section heading"
    )
    subheading = blocks.TextBlock(
        max_length=500,
        required=False,
        help_text="Section subheading"
    )
    projects = blocks.ListBlock(
        ProjectBlock(),
        min_num=1,
        max_num=20,
        help_text="Add portfolio projects"
    )

    class Meta:
        template = "blocks/portfolio_projects_block.html"
        icon = "image"
        label = "Portfolio Projects"


class CaseStudiesBlock(blocks.StructBlock):
    """Case studies section."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        default="Success Stories",
        help_text="Section heading"
    )
    subheading = blocks.TextBlock(
        max_length=500,
        required=False,
        help_text="Section subheading"
    )
    case_studies = blocks.ListBlock(
        CaseStudyBlock(),
        min_num=1,
        max_num=10,
        help_text="Add case studies"
    )

    class Meta:
        template = "blocks/case_studies_block.html"
        icon = "doc-full"
        label = "Case Studies"


class TechnologiesBlock(blocks.StructBlock):
    """Technologies showcase section."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        default="Technologies We Use",
        help_text="Section heading"
    )
    subheading = blocks.TextBlock(
        max_length=500,
        required=False,
        help_text="Section subheading"
    )
    technologies = blocks.ListBlock(
        TechnologyBlock(),
        min_num=1,
        max_num=20,
        help_text="Add technologies"
    )

    class Meta:
        template = "blocks/technologies_block.html"
        icon = "cog"
        label = "Technologies"
