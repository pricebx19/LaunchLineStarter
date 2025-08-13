"""Tests for the leads API."""
import json
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from model_bakery import baker

from leads.models import Lead
from leads.serializers import LeadCreateSerializer

User = get_user_model()


class LeadModelTest(TestCase):
    """Test the Lead model."""
    
    def setUp(self):
        """Set up test data."""
        self.lead = baker.make(
            Lead,
            name='John Doe',
            email='john@example.com',
            message='Test message',
            source='website'
        )
    
    def test_lead_creation(self):
        """Test creating a lead."""
        self.assertEqual(self.lead.name, 'John Doe')
        self.assertEqual(self.lead.email, 'john@example.com')
        self.assertEqual(self.lead.message, 'Test message')
        self.assertEqual(self.lead.source, 'website')
        self.assertFalse(self.lead.is_processed)
    
    def test_lead_str(self):
        """Test lead string representation."""
        expected = f"{self.lead.name} ({self.lead.email}) - {self.lead.created_at.strftime('%Y-%m-%d')}"
        self.assertEqual(str(self.lead), expected)
    
    def test_mark_as_processed(self):
        """Test marking a lead as processed."""
        self.assertFalse(self.lead.is_processed)
        self.assertIsNone(self.lead.processed_at)
        
        self.lead.mark_as_processed()
        
        self.assertTrue(self.lead.is_processed)
        self.assertIsNotNone(self.lead.processed_at)
    
    def test_is_recent_property(self):
        """Test the is_recent property."""
        self.assertTrue(self.lead.is_recent)


class LeadCreateAPITest(APITestCase):
    """Test the public lead creation API endpoint."""
    
    def setUp(self):
        """Set up test data."""
        self.url = reverse('leads:create_lead')
        self.valid_payload = {
            'name': 'Jane Smith',
            'email': 'jane@example.com',
            'message': 'I am interested in your services. Please contact me.',
            'source': 'website'
        }
    
    def test_create_lead_success(self):
        """Test successful lead creation."""
        response = self.client.post(
            self.url,
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Check response content
        data = response.json()
        self.assertTrue(data['success'])
        self.assertIn('id', data)
        self.assertEqual(data['message'], "Thank you for your message. We'll get back to you soon!")
        
        # Check database
        lead = Lead.objects.get(pk=data['id'])
        self.assertEqual(lead.name, 'Jane Smith')
        self.assertEqual(lead.email, 'jane@example.com')
        self.assertEqual(lead.source, 'website')
    
    def test_create_lead_missing_required_fields(self):
        """Test lead creation with missing required fields."""
        invalid_payload = {'name': 'Jane Smith'}
        
        response = self.client.post(
            self.url,
            data=json.dumps(invalid_payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        data = response.json()
        self.assertFalse(data['success'])
        self.assertIn('errors', data)
        self.assertIn('email', data['errors'])
        self.assertIn('message', data['errors'])
    
    def test_create_lead_invalid_email(self):
        """Test lead creation with invalid email."""
        invalid_payload = self.valid_payload.copy()
        invalid_payload['email'] = 'invalid-email'
        
        response = self.client.post(
            self.url,
            data=json.dumps(invalid_payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        data = response.json()
        self.assertFalse(data['success'])
        self.assertIn('email', data['errors'])
    
    def test_create_lead_short_name(self):
        """Test lead creation with too short name."""
        invalid_payload = self.valid_payload.copy()
        invalid_payload['name'] = 'J'
        
        response = self.client.post(
            self.url,
            data=json.dumps(invalid_payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        data = response.json()
        self.assertFalse(data['success'])
        self.assertIn('name', data['errors'])
    
    def test_create_lead_short_message(self):
        """Test lead creation with too short message."""
        invalid_payload = self.valid_payload.copy()
        invalid_payload['message'] = 'Hi'
        
        response = self.client.post(
            self.url,
            data=json.dumps(invalid_payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        data = response.json()
        self.assertFalse(data['success'])
        self.assertIn('message', data['errors'])
    
    def test_create_lead_strips_whitespace(self):
        """Test that name and message whitespace is stripped."""
        payload = self.valid_payload.copy()
        payload['name'] = '  Jane Smith  '
        payload['message'] = '  Test message with spaces  '
        
        response = self.client.post(
            self.url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        lead = Lead.objects.get(pk=response.json()['id'])
        self.assertEqual(lead.name, 'Jane Smith')
        self.assertEqual(lead.message, 'Test message with spaces')


class LeadAdminAPITest(APITestCase):
    """Test the admin lead management API endpoints."""
    
    def setUp(self):
        """Set up test data."""
        self.admin_user = baker.make(User, is_staff=True, is_superuser=True)
        self.regular_user = baker.make(User)
        self.lead1 = baker.make(Lead, name='Lead 1', email='lead1@example.com')
        self.lead2 = baker.make(Lead, name='Lead 2', email='lead2@example.com', is_processed=True)
        
        self.list_url = reverse('leads:lead_list')
        self.detail_url = lambda pk: reverse('leads:lead_detail', kwargs={'pk': pk})
    
    def test_list_leads_requires_admin(self):
        """Test that listing leads requires admin permission."""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_list_leads_success(self):
        """Test successful lead listing for admin."""
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(self.list_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        self.assertEqual(len(data['results']), 2)
        
        # Check ordering (should be newest first)
        self.assertEqual(data['results'][0]['name'], 'Lead 2')
        self.assertEqual(data['results'][1]['name'], 'Lead 1')
    
    def test_retrieve_lead_success(self):
        """Test successful lead retrieval for admin."""
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(self.detail_url(self.lead1.pk))
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        self.assertEqual(data['name'], self.lead1.name)
        self.assertEqual(data['email'], self.lead1.email)
        self.assertIn('message', data)
        self.assertIn('is_recent', data)
    
    def test_update_lead_success(self):
        """Test successful lead update for admin."""
        self.client.force_authenticate(user=self.admin_user)
        
        update_data = {
            'is_processed': True,
            'notes': 'Contacted customer and provided quote.'
        }
        
        response = self.client.patch(
            self.detail_url(self.lead1.pk),
            data=json.dumps(update_data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.lead1.refresh_from_db()
        self.assertTrue(self.lead1.is_processed)
        self.assertEqual(self.lead1.notes, 'Contacted customer and provided quote.')
    
    def test_delete_lead_success(self):
        """Test successful lead deletion for admin."""
        self.client.force_authenticate(user=self.admin_user)
        
        response = self.client.delete(self.detail_url(self.lead1.pk))
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Lead.objects.filter(pk=self.lead1.pk).exists())


class LeadSerializerTest(TestCase):
    """Test lead serializers."""
    
    def test_lead_create_serializer_valid_data(self):
        """Test LeadCreateSerializer with valid data."""
        data = {
            'name': 'Test User',
            'email': 'test@example.com',
            'message': 'This is a test message for validation.',
            'source': 'website'
        }
        
        serializer = LeadCreateSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        
        lead = serializer.save()
        self.assertEqual(lead.name, 'Test User')
        self.assertEqual(lead.email, 'test@example.com')
    
    def test_lead_create_serializer_strips_whitespace(self):
        """Test that serializer strips whitespace from name and message."""
        data = {
            'name': '  Test User  ',
            'email': 'test@example.com',
            'message': '  This is a test message.  ',
            'source': 'website'
        }
        
        serializer = LeadCreateSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        
        validated_data = serializer.validated_data
        self.assertEqual(validated_data['name'], 'Test User')
        self.assertEqual(validated_data['message'], 'This is a test message.')
    
    def test_lead_create_serializer_validation_errors(self):
        """Test LeadCreateSerializer validation errors."""
        # Test short name
        data = {
            'name': 'A',
            'email': 'test@example.com',
            'message': 'Valid message here.',
            'source': 'website'
        }
        
        serializer = LeadCreateSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        
        # Test short message
        data['name'] = 'Valid Name'
        data['message'] = 'Short'
        
        serializer = LeadCreateSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('message', serializer.errors)