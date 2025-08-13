"""Development settings for LaunchLine Starter project."""
import os

from .base import *  # noqa: F401,F403

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0", "[::1]"]

# CORS settings for development
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",
    "http://localhost:3000",  # Alternative frontend port
    "http://127.0.0.1:3000",
]

# Email backend for development (console)
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Database for development (can be overridden with DATABASE_URL)
if not os.environ.get("DATABASE_URL"):
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.environ.get("DATABASE_NAME", "launchline_starter_dev"),
            "USER": os.environ.get("DATABASE_USER", "postgres"),
            "PASSWORD": os.environ.get("DATABASE_PASSWORD", "postgres"),
            "HOST": os.environ.get("DATABASE_HOST", "localhost"),
            "PORT": os.environ.get("DATABASE_PORT", "5432"),
        }
    }

# Django debug toolbar (optional, add to requirements if needed)
try:
    import debug_toolbar  # noqa: F401
    INSTALLED_APPS += ["debug_toolbar"]  # noqa: F405
    MIDDLEWARE.insert(1, "debug_toolbar.middleware.DebugToolbarMiddleware")  # noqa: F405
    INTERNAL_IPS = ["127.0.0.1", "::1"]
except ImportError:
    pass

# Cache (use local memory cache for development)
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
    }
}

# Wagtail settings for development
WAGTAILADMIN_BASE_URL = "http://localhost:8000"

# Less strict password validation for development
AUTH_PASSWORD_VALIDATORS = []

# Logging for development
LOGGING["loggers"]["django"]["level"] = "DEBUG"  # noqa: F405