"""Models for the leads app."""
from django.db import models
from django.utils import timezone


class Lead(models.Model):
    """Model to store lead/contact form submissions."""
    
    SOURCE_CHOICES = [
        ('website', 'Website Contact Form'),
        ('landing_page', 'Landing Page'),
        ('newsletter', 'Newsletter Signup'),
        ('demo_request', 'Demo Request'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(
        max_length=255,
        help_text="Contact name"
    )
    email = models.EmailField(
        help_text="Contact email address"
    )
    message = models.TextField(
        help_text="Contact message/inquiry"
    )
    source = models.CharField(
        max_length=50,
        choices=SOURCE_CHOICES,
        default='website',
        help_text="Source of the lead"
    )
    
    # Metadata
    created_at = models.DateTimeField(
        default=timezone.now,
        help_text="When the lead was submitted"
    )
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text="IP address of the submitter"
    )
    user_agent = models.TextField(
        blank=True,
        help_text="User agent string"
    )
    
    # Lead management
    is_processed = models.BooleanField(
        default=False,
        help_text="Has this lead been processed?"
    )
    processed_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When the lead was processed"
    )
    notes = models.TextField(
        blank=True,
        help_text="Internal notes about this lead"
    )
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Lead"
        verbose_name_plural = "Leads"
        indexes = [
            models.Index(fields=['created_at']),
            models.Index(fields=['email']),
            models.Index(fields=['source']),
            models.Index(fields=['is_processed']),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.email}) - {self.created_at.strftime('%Y-%m-%d')}"
    
    def mark_as_processed(self):
        """Mark the lead as processed."""
        self.is_processed = True
        self.processed_at = timezone.now()
        self.save(update_fields=['is_processed', 'processed_at'])
    
    @property
    def is_recent(self):
        """Check if the lead was submitted in the last 24 hours."""
        return (timezone.now() - self.created_at).days < 1