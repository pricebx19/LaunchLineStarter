#!/usr/bin/env python3
"""
Test script for Services page Wagtail migration
"""
import requests
import json
import sys
from typing import Dict, Any

# Configuration
API_BASE_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:5173"


def test_feature_flag_api():
    """Test feature flag API endpoints"""
    print("🔍 Testing Feature Flag API...")

    try:
        # Test feature flags list
        response = requests.get(f"{API_BASE_URL}/api/feature-flags/")
        if response.status_code == 200:
            data = response.json()
            print(
                f"✅ Feature flags API working - {len(data.get('flags', {}))} flags found")

            # Check if WAGTAIL_SERVICES flag exists
            flags = data.get('flags', {})
            if 'WAGTAIL_SERVICES' in flags:
                print(
                    f"✅ WAGTAIL_SERVICES flag found - Status: {flags['WAGTAIL_SERVICES']}")
            else:
                print("❌ WAGTAIL_SERVICES flag not found")
                return False
        else:
            print(
                f"❌ Feature flags API failed - Status: {response.status_code}")
            return False

    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend API. Is the server running?")
        return False
    except Exception as e:
        print(f"❌ Error testing feature flags API: {e}")
        return False

    return True


def test_wagtail_api():
    """Test Wagtail API endpoints"""
    print("\n🔍 Testing Wagtail API...")

    try:
        # Test pages API
        response = requests.get(
            f"{API_BASE_URL}/api/v2/pages/?type=pages.ServicesPage")
        if response.status_code == 200:
            data = response.json()
            items = data.get('items', [])
            print(
                f"✅ Wagtail pages API working - {len(items)} ServicesPage(s) found")

            if items:
                services_page = items[0]
                content = services_page.get('content', [])
                print(f"✅ Services page has {len(content)} content blocks")

                # Check for expected block types
                block_types = [block.get('type') for block in content]
                expected_blocks = ['hero', 'service_packages',
                                   'ala_carte_services', 'faq_section']
                found_blocks = [
                    bt for bt in expected_blocks if bt in block_types]
                print(f"✅ Found blocks: {found_blocks}")

                return True
            else:
                print("⚠️  No ServicesPage found. Create one in Wagtail admin.")
                return False
        else:
            print(f"❌ Wagtail API failed - Status: {response.status_code}")
            return False

    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to Wagtail API. Is the server running?")
        return False
    except Exception as e:
        print(f"❌ Error testing Wagtail API: {e}")
        return False


def test_feature_flag_toggle():
    """Test feature flag toggle functionality"""
    print("\n🔍 Testing Feature Flag Toggle...")

    try:
        # Get current status
        response = requests.get(
            f"{API_BASE_URL}/api/feature-flags/WAGTAIL_SERVICES/")
        if response.status_code == 200:
            data = response.json()
            current_status = data.get('is_enabled', False)
            print(f"✅ Current WAGTAIL_SERVICES status: {current_status}")

            # Toggle the flag
            toggle_response = requests.post(
                f"{API_BASE_URL}/api/feature-flags/WAGTAIL_SERVICES/toggle/")
            if toggle_response.status_code == 200:
                new_data = toggle_response.json()
                new_status = new_data.get('is_enabled', False)
                print(f"✅ Toggled WAGTAIL_SERVICES to: {new_status}")

                # Toggle back to original state
                if new_status != current_status:
                    requests.post(
                        f"{API_BASE_URL}/api/feature-flags/WAGTAIL_SERVICES/toggle/")
                    print(f"✅ Restored WAGTAIL_SERVICES to: {current_status}")

                return True
            else:
                print(
                    f"❌ Toggle failed - Status: {toggle_response.status_code}")
                return False
        else:
            print(
                f"❌ Cannot get feature flag status - Status: {response.status_code}")
            return False

    except Exception as e:
        print(f"❌ Error testing feature flag toggle: {e}")
        return False


def test_frontend_connectivity():
    """Test frontend connectivity"""
    print("\n🔍 Testing Frontend Connectivity...")

    try:
        response = requests.get(f"{FRONTEND_URL}/services", timeout=5)
        if response.status_code == 200:
            print("✅ Frontend services page accessible")
            return True
        else:
            print(
                f"❌ Frontend services page failed - Status: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to frontend. Is the dev server running?")
        return False
    except Exception as e:
        print(f"❌ Error testing frontend: {e}")
        return False


def main():
    """Run all tests"""
    print("🚀 Services Page Wagtail Migration Test Suite")
    print("=" * 50)

    tests = [
        ("Feature Flag API", test_feature_flag_api),
        ("Wagtail API", test_wagtail_api),
        ("Feature Flag Toggle", test_feature_flag_toggle),
        ("Frontend Connectivity", test_frontend_connectivity),
    ]

    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {e}")
            results.append((test_name, False))

    # Summary
    print("\n" + "=" * 50)
    print("📊 Test Results Summary")
    print("=" * 50)

    passed = 0
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
        if result:
            passed += 1

    print(f"\n🎯 {passed}/{len(results)} tests passed")

    if passed == len(results):
        print("🎉 All tests passed! Migration is ready.")
        return 0
    else:
        print("⚠️  Some tests failed. Check the issues above.")
        return 1


if __name__ == "__main__":
    sys.exit(main())
