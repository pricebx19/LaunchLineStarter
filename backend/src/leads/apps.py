"""App configuration for leads app."""
from django.apps import AppConfig


class LeadsConfig(AppConfig):
    """Configuration for leads app."""
    
    default_auto_field = "django.db.models.BigAutoField"
    name = "leads"
    verbose_name = "Leads"