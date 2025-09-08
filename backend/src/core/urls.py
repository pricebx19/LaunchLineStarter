"""URLs for core app."""
from django.urls import path
from .api import (
    FeatureFlagsAPIView,
    feature_flag_detail,
    feature_flags_by_category,
    toggle_feature_flag,
    wagtail_transition_status,
)

app_name = 'core'

urlpatterns = [
    # Feature flags API
    path('api/feature-flags/', FeatureFlagsAPIView.as_view(), name='feature_flags'),
    path('api/feature-flags/<str:flag_name>/',
         feature_flag_detail, name='feature_flag_detail'),
    path('api/feature-flags/category/<str:category>/',
         feature_flags_by_category, name='feature_flags_by_category'),
    path('api/feature-flags/<str:flag_name>/toggle/',
         toggle_feature_flag, name='toggle_feature_flag'),
    path('api/wagtail-transition/', wagtail_transition_status,
         name='wagtail_transition_status'),
]
