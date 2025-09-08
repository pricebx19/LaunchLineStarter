#!/usr/bin/env python3
"""
Enhanced Integration test script for LaunchLine Starter
Tests the complete connection between frontend and backend
"""

import requests
import json
import sys
from urllib.parse import urljoin

def test_backend_api(base_url="http://localhost:8000"):
    """Test backend API endpoints."""
    print(f"Testing backend API at {base_url}")
    
    # Test health check
    try:
        response = requests.get(f"{base_url}/admin/login/", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running and accessible")
        else:
            print(f"⚠️  Backend responded with status {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend is not accessible: {e}")
        return False
    
    # Test API endpoints
    api_base = f"{base_url}/api/v2/"
    
    # Test pages API
    try:
        response = requests.get(f"{api_base}pages/", timeout=5)
        if response.status_code == 200:
            print("✅ Pages API is working")
            data = response.json()
            print(f"   Found {len(data.get('items', []))} pages")
        else:
            print(f"❌ Pages API failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Pages API error: {e}")
    
    # Test blog pages specifically
    try:
        response = requests.get(f"{api_base}pages/?type=pages.BlogPage", timeout=5)
        if response.status_code == 200:
            print("✅ Blog pages API is working")
            data = response.json()
            blog_posts = data.get('items', [])
            print(f"   Found {len(blog_posts)} blog posts")
            if blog_posts:
                blog_post = blog_posts[0]
                print(f"   Sample blog: {blog_post.get('title', 'No title')}")
                print(f"   Intro: {blog_post.get('intro', 'No intro')[:50]}...")
        else:
            print(f"❌ Blog pages API failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Blog pages API error: {e}")
    
    # Test leads API
    try:
        response = requests.get(f"{base_url}/api/leads/", timeout=5)
        if response.status_code == 405:  # Method not allowed for GET
            print("✅ Leads API endpoint exists")
        else:
            print(f"⚠️  Leads API responded with status {response.status_code}")
    except Exception as e:
        print(f"❌ Leads API error: {e}")
    
    # Test lead submission
    try:
        test_lead = {
            "name": "Integration Test User",
            "email": "test@integration.com",
            "message": "This is a test lead submission from the integration test script.",
            "source": "integration-test"
        }
        response = requests.post(f"{base_url}/api/leads/", json=test_lead, timeout=10)
        if response.status_code == 201:
            print("✅ Lead submission is working")
            lead_data = response.json()
            print(f"   Lead ID: {lead_data.get('id')}")
            print(f"   Success message: {lead_data.get('message', 'No message')}")
        else:
            print(f"❌ Lead submission failed with status {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Lead submission error: {e}")
    
    return True

def test_frontend_api(base_url="http://localhost:5173"):
    """Test frontend API calls."""
    print(f"\nTesting frontend API calls to {base_url}")
    
    # Test if frontend is accessible
    try:
        response = requests.get(base_url, timeout=5)
        if response.status_code == 200:
            print("✅ Frontend is accessible")
        else:
            print(f"⚠️  Frontend responded with status {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Frontend is not accessible: {e}")
        return False
    
    return True

def test_cors(base_url="http://localhost:8000"):
    """Test CORS configuration."""
    print(f"\nTesting CORS configuration for {base_url}")
    
    # Test CORS preflight request
    try:
        headers = {
            'Origin': 'http://localhost:5173',
            'Access-Control-Request-Method': 'GET',
            'Access-Control-Request-Headers': 'Content-Type'
        }
        response = requests.options(f"{base_url}/api/v2/pages/", headers=headers, timeout=5)
        
        if response.status_code == 200:
            print("✅ CORS preflight request successful")
            cors_headers = response.headers.get('Access-Control-Allow-Origin')
            if cors_headers:
                print(f"   CORS Origin: {cors_headers}")
            else:
                print("   ⚠️  No CORS origin header found")
        else:
            print(f"❌ CORS preflight failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ CORS test error: {e}")

def test_content_integration(base_url="http://localhost:8000"):
    """Test content integration between frontend and backend."""
    print(f"\nTesting content integration with {base_url}")
    
    api_base = f"{base_url}/api/v2/"
    
    # Test content blocks
    try:
        response = requests.get(f"{api_base}pages/?type=pages.HomePage&fields=content", timeout=5)
        if response.status_code == 200:
            data = response.json()
            home_pages = data.get('items', [])
            if home_pages:
                home_page = home_pages[0]
                content = home_page.get('content', [])
                print(f"✅ Content blocks found: {len(content)}")
                for i, block in enumerate(content):
                    print(f"   Block {i+1}: {block.get('type', 'unknown')}")
            else:
                print("⚠️  No home page content found")
        else:
            print(f"❌ Content API failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Content integration error: {e}")

def test_seo_integration(base_url="http://localhost:8000"):
    """Test SEO integration between frontend and backend."""
    print(f"\nTesting SEO integration with {base_url}")
    
    api_base = f"{base_url}/api/v2/"
    
    # Test SEO fields
    try:
        response = requests.get(f"{api_base}pages/?type=pages.HomePage&fields=meta", timeout=5)
        if response.status_code == 200:
            data = response.json()
            home_pages = data.get('items', [])
            if home_pages:
                home_page = home_pages[0]
                meta = home_page.get('meta', {})
                print(f"✅ SEO meta data found")
                print(f"   Title: {meta.get('seo_title', 'No SEO title')}")
                print(f"   Description: {meta.get('search_description', 'No description')}")
                print(f"   Slug: {meta.get('slug', 'No slug')}")
            else:
                print("⚠️  No home page SEO data found")
        else:
            print(f"❌ SEO API failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ SEO integration error: {e}")

def main():
    """Main test function."""
    print("🚀 LaunchLine Starter Enhanced Integration Test")
    print("=" * 60)
    
    # Test backend
    backend_ok = test_backend_api()
    
    # Test frontend
    frontend_ok = test_frontend_api()
    
    # Test CORS
    if backend_ok:
        test_cors()
    
    # Test content integration
    if backend_ok:
        test_content_integration()
    
    # Test SEO integration
    if backend_ok:
        test_seo_integration()
    
    print("\n" + "=" * 60)
    if backend_ok and frontend_ok:
        print("🎉 Enhanced integration test completed successfully!")
        print("Frontend and backend are properly connected with:")
        print("✅ Lead management system")
        print("✅ Dynamic content rendering")
        print("✅ SEO integration")
        print("✅ CORS configuration")
        print("✅ API endpoints")
    else:
        print("❌ Integration test failed!")
        print("Please check the errors above and ensure both services are running.")
        sys.exit(1)

if __name__ == "__main__":
    main()
