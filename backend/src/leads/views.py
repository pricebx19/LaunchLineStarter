"""Views for the leads app."""
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Lead
from .serializers import LeadCreateSerializer, LeadListSerializer, LeadDetailSerializer


def get_client_ip(request):
    """Get client IP address from request."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def send_lead_notification(lead):
    """Send email notification for new lead."""
    subject = f"New Lead: {lead.name}"
    message = f"""
New lead submitted:

Name: {lead.name}
Email: {lead.email}
Source: {lead.get_source_display()}
Submitted: {lead.created_at}

Message:
{lead.message}

---
LaunchLine Starter
    """.strip()
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@example.com'),
            recipient_list=[getattr(settings, 'LEAD_NOTIFICATION_EMAIL', 'admin@example.com')],
            fail_silently=True,
        )
    except Exception:
        # Log the error in production
        pass


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
@throttle_classes([AnonRateThrottle])
def create_lead(request):
    """Create a new lead from contact form submission."""
    serializer = LeadCreateSerializer(data=request.data)
    
    if serializer.is_valid():
        # Create the lead with additional metadata
        lead = serializer.save(
            ip_address=get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )
        
        # Send notification email
        send_lead_notification(lead)
        
        return Response(
            {
                'id': lead.id,
                'message': 'Thank you for your message. We\'ll get back to you soon!',
                'success': True
            },
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        {
            'errors': serializer.errors,
            'message': 'Please check your information and try again.',
            'success': False
        },
        status=status.HTTP_400_BAD_REQUEST
    )


class LeadListCreateAPIView(ListCreateAPIView):
    """List and create leads (admin/internal use only)."""
    
    queryset = Lead.objects.all()
    permission_classes = [permissions.IsAdminUser]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return LeadCreateSerializer
        return LeadListSerializer
    
    def perform_create(self, serializer):
        """Add metadata when creating a lead."""
        serializer.save(
            ip_address=get_client_ip(self.request),
            user_agent=self.request.META.get('HTTP_USER_AGENT', '')
        )


class LeadDetailAPIView(RetrieveUpdateDestroyAPIView):
    """Retrieve, update, and delete leads (admin/internal use only)."""
    
    queryset = Lead.objects.all()
    serializer_class = LeadDetailSerializer
    permission_classes = [permissions.IsAdminUser]