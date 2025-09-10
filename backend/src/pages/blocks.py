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


# === ADVANCED BLOCK TYPES ===

class VideoBlock(blocks.StructBlock):
    """Video block with embed URL and optional poster image."""

    video_url = blocks.URLBlock(
        help_text="Video URL (YouTube, Vimeo, etc.)"
    )
    title = blocks.CharBlock(
        max_length=255,
        required=False,
        help_text="Video title"
    )
    description = blocks.TextBlock(
        max_length=500,
        required=False,
        help_text="Video description"
    )
    poster_image = ImageChooserBlock(
        required=False,
        help_text="Poster image for video"
    )
    autoplay = blocks.BooleanBlock(
        required=False,
        default=False,
        help_text="Autoplay video"
    )
    controls = blocks.BooleanBlock(
        required=False,
        default=True,
        help_text="Show video controls"
    )

    class Meta:
        template = "blocks/video_block.html"
        icon = "media"
        label = "Video"


class GalleryBlock(blocks.StructBlock):
    """Image gallery with multiple images."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        help_text="Gallery heading"
    )
    images = blocks.ListBlock(
        ImageChooserBlock(),
        min_num=2,
        max_num=20,
        help_text="Add images to gallery"
    )
    layout = blocks.ChoiceBlock(
        choices=[
            ("grid", "Grid"),
            ("carousel", "Carousel"),
            ("masonry", "Masonry"),
        ],
        default="grid",
        help_text="Gallery layout"
    )
    columns = blocks.ChoiceBlock(
        choices=[
            ("2", "2 Columns"),
            ("3", "3 Columns"),
            ("4", "4 Columns"),
        ],
        default="3",
        help_text="Number of columns (grid layout)"
    )

    class Meta:
        template = "blocks/gallery_block.html"
        icon = "image"
        label = "Image Gallery"


class CodeBlock(blocks.StructBlock):
    """Code block with syntax highlighting."""

    code = blocks.TextBlock(
        help_text="Code content"
    )
    language = blocks.ChoiceBlock(
        choices=[
            ("javascript", "JavaScript"),
            ("python", "Python"),
            ("html", "HTML"),
            ("css", "CSS"),
            ("json", "JSON"),
            ("bash", "Bash"),
            ("sql", "SQL"),
            ("php", "PHP"),
            ("java", "Java"),
            ("cpp", "C++"),
            ("csharp", "C#"),
            ("go", "Go"),
            ("rust", "Rust"),
            ("swift", "Swift"),
            ("kotlin", "Kotlin"),
        ],
        default="javascript",
        help_text="Programming language"
    )
    show_line_numbers = blocks.BooleanBlock(
        required=False,
        default=True,
        help_text="Show line numbers"
    )
    copy_button = blocks.BooleanBlock(
        required=False,
        default=True,
        help_text="Show copy button"
    )

    class Meta:
        template = "blocks/code_block.html"
        icon = "code"
        label = "Code Block"


class AccordionBlock(blocks.StructBlock):
    """Accordion with expandable items."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        help_text="Accordion heading"
    )
    items = blocks.ListBlock(
        blocks.StructBlock([
            ("title", blocks.CharBlock(max_length=200, help_text="Item title")),
            ("content", blocks.RichTextBlock(help_text="Item content")),
            ("open_by_default", blocks.BooleanBlock(
                required=False, default=False, help_text="Open by default")),
        ]),
        min_num=1,
        max_num=10,
        help_text="Add accordion items"
    )

    class Meta:
        template = "blocks/accordion_block.html"
        icon = "list-ol"
        label = "Accordion"


class TabsBlock(blocks.StructBlock):
    """Tabbed content block."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        help_text="Tabs heading"
    )
    tabs = blocks.ListBlock(
        blocks.StructBlock([
            ("title", blocks.CharBlock(max_length=100, help_text="Tab title")),
            ("content", blocks.RichTextBlock(help_text="Tab content")),
        ]),
        min_num=2,
        max_num=6,
        help_text="Add tabs"
    )

    class Meta:
        template = "blocks/tabs_block.html"
        icon = "list-ol"
        label = "Tabs"


class PricingTableBlock(blocks.StructBlock):
    """Pricing table with multiple tiers."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        default="Choose Your Plan",
        help_text="Pricing table heading"
    )
    subheading = blocks.TextBlock(
        max_length=500,
        required=False,
        help_text="Pricing table subheading"
    )
    plans = blocks.ListBlock(
        blocks.StructBlock([
            ("name", blocks.CharBlock(max_length=100, help_text="Plan name")),
            ("price", blocks.CharBlock(max_length=50,
             help_text="Price (e.g., '$99/month')")),
            ("description", blocks.TextBlock(
                max_length=300, help_text="Plan description")),
            ("features", blocks.ListBlock(blocks.CharBlock(
                max_length=200), help_text="Plan features")),
            ("cta_text", blocks.CharBlock(max_length=50,
             default="Get Started", help_text="CTA button text")),
            ("cta_link", blocks.URLBlock(help_text="CTA button URL")),
            ("popular", blocks.BooleanBlock(required=False,
             default=False, help_text="Mark as popular")),
        ]),
        min_num=2,
        max_num=5,
        help_text="Add pricing plans"
    )

    class Meta:
        template = "blocks/pricing_table_block.html"
        icon = "list-ul"
        label = "Pricing Table"


class TimelineBlock(blocks.StructBlock):
    """Timeline with events and milestones."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        help_text="Timeline heading"
    )
    events = blocks.ListBlock(
        blocks.StructBlock([
            ("date", blocks.CharBlock(max_length=50, help_text="Event date")),
            ("title", blocks.CharBlock(max_length=200, help_text="Event title")),
            ("description", blocks.TextBlock(
                max_length=500, help_text="Event description")),
            ("icon", blocks.RawHTMLBlock(help_text="SVG icon HTML code")),
        ]),
        min_num=1,
        max_num=10,
        help_text="Add timeline events"
    )

    class Meta:
        template = "blocks/timeline_block.html"
        icon = "list-ol"
        label = "Timeline"


class ComparisonTableBlock(blocks.StructBlock):
    """Comparison table for features or products."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        help_text="Comparison table heading"
    )
    columns = blocks.ListBlock(
        blocks.StructBlock([
            ("title", blocks.CharBlock(max_length=100, help_text="Column title")),
            ("subtitle", blocks.CharBlock(max_length=200,
             required=False, help_text="Column subtitle")),
            ("highlight", blocks.BooleanBlock(required=False,
             default=False, help_text="Highlight this column")),
        ]),
        min_num=2,
        max_num=5,
        help_text="Add comparison columns"
    )
    rows = blocks.ListBlock(
        blocks.StructBlock([
            ("feature", blocks.CharBlock(max_length=200, help_text="Feature name")),
            ("values", blocks.ListBlock(blocks.CharBlock(
                max_length=100), help_text="Values for each column")),
        ]),
        min_num=1,
        max_num=20,
        help_text="Add comparison rows"
    )

    class Meta:
        template = "blocks/comparison_table_block.html"
        icon = "table"
        label = "Comparison Table"


class FormBlock(blocks.StructBlock):
    """Contact or lead generation form."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        help_text="Form heading"
    )
    description = blocks.TextBlock(
        max_length=500,
        required=False,
        help_text="Form description"
    )
    fields = blocks.ListBlock(
        blocks.StructBlock([
            ("name", blocks.CharBlock(max_length=100, help_text="Field name")),
            ("label", blocks.CharBlock(max_length=200, help_text="Field label")),
            ("type", blocks.ChoiceBlock(
                choices=[
                    ("text", "Text"),
                    ("email", "Email"),
                    ("tel", "Phone"),
                    ("textarea", "Textarea"),
                    ("select", "Select"),
                    ("checkbox", "Checkbox"),
                    ("radio", "Radio"),
                ],
                default="text",
                help_text="Field type"
            )),
            ("required", blocks.BooleanBlock(required=False,
             default=False, help_text="Required field")),
            ("placeholder", blocks.CharBlock(max_length=200,
             required=False, help_text="Field placeholder")),
            ("options", blocks.ListBlock(blocks.CharBlock(max_length=100),
             required=False, help_text="Options for select/radio fields")),
        ]),
        min_num=1,
        max_num=10,
        help_text="Add form fields"
    )
    submit_text = blocks.CharBlock(
        max_length=50,
        default="Submit",
        help_text="Submit button text"
    )
    success_message = blocks.TextBlock(
        max_length=500,
        default="Thank you for your submission!",
        help_text="Success message"
    )

    class Meta:
        template = "blocks/form_block.html"
        icon = "form"
        label = "Form"


class MapBlock(blocks.StructBlock):
    """Interactive map block."""

    address = blocks.CharBlock(
        max_length=500,
        help_text="Address to display on map"
    )
    zoom = blocks.IntegerBlock(
        min_value=1,
        max_value=20,
        default=15,
        help_text="Map zoom level"
    )
    height = blocks.IntegerBlock(
        min_value=200,
        max_value=800,
        default=400,
        help_text="Map height in pixels"
    )
    show_marker = blocks.BooleanBlock(
        required=False,
        default=True,
        help_text="Show location marker"
    )
    marker_title = blocks.CharBlock(
        max_length=200,
        required=False,
        help_text="Marker title"
    )

    class Meta:
        template = "blocks/map_block.html"
        icon = "site"
        label = "Map"


class ProgressBarBlock(blocks.StructBlock):
    """Progress bar for skills or completion."""

    heading = blocks.CharBlock(
        max_length=255,
        required=False,
        help_text="Progress section heading"
    )
    bars = blocks.ListBlock(
        blocks.StructBlock([
            ("label", blocks.CharBlock(max_length=100, help_text="Progress label")),
            ("percentage", blocks.IntegerBlock(min_value=0,
             max_value=100, help_text="Progress percentage")),
            ("color", blocks.ChoiceBlock(
                choices=[
                    ("blue", "Blue"),
                    ("green", "Green"),
                    ("red", "Red"),
                    ("yellow", "Yellow"),
                    ("purple", "Purple"),
                    ("pink", "Pink"),
                ],
                default="blue",
                help_text="Progress bar color"
            )),
        ]),
        min_num=1,
        max_num=10,
        help_text="Add progress bars"
    )

    class Meta:
        template = "blocks/progress_bar_block.html"
        icon = "chart-line"
        label = "Progress Bars"
