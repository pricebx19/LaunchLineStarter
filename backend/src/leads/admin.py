"""Admin configuration for the leads app."""
from django.contrib import admin
from django.utils.html import format_html
from django.utils import timezone
from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    """Admin interface for Lead model."""
    
    list_display = [
        'name', 'email', 'source', 'created_at_formatted', 
        'is_processed_display', 'is_recent_display'
    ]
    list_filter = [
        'source', 'is_processed', 'created_at'
    ]
    search_fields = ['name', 'email', 'message']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'ip_address', 'user_agent', 'is_recent_display']
    
    fieldsets = [
        ('Contact Information', {
            'fields': ['name', 'email', 'source']
        }),
        ('Message', {
            'fields': ['message']
        }),
        ('Metadata', {
            'fields': ['created_at', 'ip_address', 'user_agent'],
            'classes': ['collapse']
        }),
        ('Lead Management', {
            'fields': ['is_processed', 'processed_at', 'notes']
        }),
    ]
    
    actions = ['mark_as_processed', 'mark_as_unprocessed']
    
    def created_at_formatted(self, obj):
        """Format the created_at timestamp."""
        return obj.created_at.strftime('%Y-%m-%d %H:%M')
    created_at_formatted.short_description = 'Submitted'
    
    def is_processed_display(self, obj):
        """Display processed status with colored icons."""
        if obj.is_processed:
            return format_html(
                '<span style="color: green;">✓ Processed</span>'
            )
        return format_html(
            '<span style="color: orange;">⏳ Pending</span>'
        )
    is_processed_display.short_description = 'Status'
    
    def is_recent_display(self, obj):
        """Display if the lead is recent."""
        if obj.is_recent:
            return format_html(
                '<span style="color: blue;">🕒 New</span>'
            )
        return ''
    is_recent_display.short_description = 'New'
    
    def mark_as_processed(self, request, queryset):
        """Mark selected leads as processed."""
        updated = queryset.filter(is_processed=False).update(
            is_processed=True,
            processed_at=timezone.now()
        )
        self.message_user(
            request, 
            f'{updated} lead(s) marked as processed.'
        )
    mark_as_processed.short_description = 'Mark selected leads as processed'
    
    def mark_as_unprocessed(self, request, queryset):
        """Mark selected leads as unprocessed."""
        updated = queryset.filter(is_processed=True).update(
            is_processed=False,
            processed_at=None
        )
        self.message_user(
            request, 
            f'{updated} lead(s) marked as unprocessed.'
        )
    mark_as_unprocessed.short_description = 'Mark selected leads as unprocessed'
    
    def get_queryset(self, request):
        """Optimize queryset for admin list view."""
        return super().get_queryset(request).select_related()