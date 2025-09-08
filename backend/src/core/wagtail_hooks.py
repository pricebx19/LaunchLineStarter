"""Wagtail hooks for core app."""
from wagtail import hooks
from .admin import feature_flag_viewset


@hooks.register('register_admin_viewset')
def register_feature_flag_viewset():
    """Register the feature flag viewset in Wagtail admin."""
    return feature_flag_viewset
