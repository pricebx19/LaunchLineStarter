"""URL patterns for the leads app."""
from django.urls import path
from . import views

app_name = 'leads'

urlpatterns = [
    # Public endpoint for creating leads
    path('', views.create_lead, name='create_lead'),
    
    # Admin endpoints for managing leads
    path('manage/', views.LeadListCreateAPIView.as_view(), name='lead_list'),
    path('manage/<int:pk>/', views.LeadDetailAPIView.as_view(), name='lead_detail'),
]