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