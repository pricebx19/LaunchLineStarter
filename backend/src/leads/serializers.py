"""Serializers for the leads app."""
from rest_framework import serializers
from .models import Lead


class LeadCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new leads."""
    
    class Meta:
        model = Lead
        fields = ['name', 'email', 'message', 'source']
        extra_kwargs = {
            'name': {
                'required': True,
                'error_messages': {
                    'blank': 'Please provide your name.',
                    'required': 'Name is required.',
                }
            },
            'email': {
                'required': True,
                'error_messages': {
                    'blank': 'Please provide your email address.',
                    'required': 'Email is required.',
                    'invalid': 'Please provide a valid email address.',
                }
            },
            'message': {
                'required': True,
                'error_messages': {
                    'blank': 'Please provide a message.',
                    'required': 'Message is required.',
                }
            },
        }
    
    def validate_name(self, value):
        """Validate the name field."""
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        return value.strip()
    
    def validate_message(self, value):
        """Validate the message field."""
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        return value.strip()


class LeadListSerializer(serializers.ModelSerializer):
    """Serializer for listing leads (admin/internal use)."""
    
    is_recent = serializers.ReadOnlyField()
    
    class Meta:
        model = Lead
        fields = [
            'id', 'name', 'email', 'source', 'created_at', 
            'is_processed', 'processed_at', 'is_recent'
        ]
        read_only_fields = ['id', 'created_at', 'processed_at', 'is_recent']


class LeadDetailSerializer(serializers.ModelSerializer):
    """Serializer for lead detail view (admin/internal use)."""
    
    is_recent = serializers.ReadOnlyField()
    
    class Meta:
        model = Lead
        fields = [
            'id', 'name', 'email', 'message', 'source', 'created_at',
            'ip_address', 'user_agent', 'is_processed', 'processed_at',
            'notes', 'is_recent'
        ]
        read_only_fields = [
            'id', 'created_at', 'ip_address', 'user_agent', 'is_recent'
        ]