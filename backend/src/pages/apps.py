"""App configuration for pages app."""
from django.apps import AppConfig


class PagesConfig(AppConfig):
    """Configuration for pages app."""
    
    default_auto_field = "django.db.models.BigAutoField"
    name = "pages"
    verbose_name = "Pages"