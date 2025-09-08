# LaunchLine Starter Makefile
# Development tasks for backend and frontend

.PHONY: help setup clean up down be fe logs migrate createsuperuser seed fmt lint test build

# Default target
help:
	@echo "LaunchLine Starter - Available Commands:"
	@echo ""
	@echo "Setup:"
	@echo "  setup          - Initial project setup (install dependencies, create .env)"
	@echo "  clean          - Clean up containers, volumes, and cache"
	@echo ""
	@echo "Development:"
	@echo "  up             - Start all services (Docker Compose)"
	@echo "  down           - Stop all services"
	@echo "  be             - Shell into backend container"
	@echo "  fe             - Shell into frontend directory (if running locally)"
	@echo "  logs           - Show service logs"
	@echo ""
	@echo "Backend:"
	@echo "  migrate        - Run Django migrations"
	@echo "  createsuperuser - Create Django superuser"
	@echo "  seed           - Seed database with initial content"
	@echo "  collectstatic  - Collect static files"
	@echo ""
	@echo "Code Quality:"
	@echo "  fmt            - Format code (Black, isort)"
	@echo "  lint           - Run linters (Ruff, mypy, etc.)"
	@echo "  test           - Run tests"
	@echo "  test-cov       - Run tests with coverage"
	@echo ""
	@echo "Build:"
	@echo "  build          - Build all containers"
	@echo "  build-backend  - Build backend container only"
	@echo ""

# Setup commands
setup:
	@echo "Setting up LaunchLine Starter..."
	@if [ ! -f .env ]; then cp .env.example .env; echo "Created .env file"; fi
	@if [ ! -f backend/.env ]; then cp backend/.env.example backend/.env; echo "Created backend/.env file"; fi
	@if [ -d backend ]; then cd backend && poetry install; echo "Backend dependencies installed"; fi
	@if [ -f .pre-commit-config.yaml ]; then poetry run pre-commit install; echo "Pre-commit hooks installed"; fi
	@echo "Setup complete! Run 'make up' to start the development environment."

clean:
	@echo "Cleaning up..."
	docker-compose -f ops/docker-compose.dev.yml down -v
	docker system prune -f
	@if [ -d backend ]; then cd backend && find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true; fi
	@if [ -d backend ]; then cd backend && find . -name "*.pyc" -delete 2>/dev/null || true; fi
	@echo "Cleanup complete"

# Docker Compose commands
up:
	docker-compose -f ops/docker-compose.dev.yml up --build -d
	@echo "Services started. Access:"
	@echo "  - Frontend: http://localhost"
	@echo "  - Backend API: http://localhost/api/"
	@echo "  - Django Admin: http://localhost/admin/"
	@echo "  - Wagtail CMS: http://localhost/cms/"
	@echo "  - Mailhog: http://localhost:8025"

down:
	docker-compose -f ops/docker-compose.dev.yml down

build:
	docker-compose -f ops/docker-compose.dev.yml build

build-backend:
	docker-compose -f ops/docker-compose.dev.yml build backend

# Shell access
be:
	docker-compose -f ops/docker-compose.dev.yml exec backend bash

fe:
	@if [ -d frontend ]; then cd frontend && bash; else echo "Frontend directory not found"; fi

# Logs
logs:
	docker-compose -f ops/docker-compose.dev.yml logs -f

logs-backend:
	docker-compose -f ops/docker-compose.dev.yml logs -f backend

logs-db:
	docker-compose -f ops/docker-compose.dev.yml logs -f db

# Database commands
migrate:
	docker-compose -f ops/docker-compose.dev.yml exec backend python manage.py migrate

migrate-local:
	cd backend && python manage.py migrate

createsuperuser:
	docker-compose -f ops/docker-compose.dev.yml exec backend python manage.py createsuperuser

createsuperuser-local:
	cd backend && python manage.py createsuperuser

seed:
	docker-compose -f ops/docker-compose.dev.yml exec backend python manage.py seed_data

seed-local:
	cd backend && python manage.py seed_data

collectstatic:
	docker-compose -f ops/docker-compose.dev.yml exec backend python manage.py collectstatic --noinput

collectstatic-local:
	cd backend && python manage.py collectstatic --noinput

# Code quality commands
fmt:
	@echo "Formatting backend code..."
	cd backend && poetry run black .
	cd backend && poetry run isort .
	@echo "Code formatting complete"

lint:
	@echo "Running backend linters..."
	cd backend && poetry run ruff check .
	cd backend && poetry run black --check .
	cd backend && poetry run isort --check-only .
	cd backend && poetry run mypy .
	@echo "Linting complete"

# Testing
test:
	@echo "Running backend tests..."
	cd backend && poetry run python manage.py test --settings=config.settings.dev

test-integration:
	@echo "Running integration tests..."
	python test_integration.py

test-cov:
	@echo "Running backend tests with coverage..."
	cd backend && poetry run pytest --cov=src --cov-report=html --cov-report=term

test-docker:
	docker-compose -f ops/docker-compose.dev.yml exec backend python manage.py test

# Local development (without Docker)
install:
	@echo "Installing backend dependencies..."
	cd backend && poetry install
	@echo "Installing pre-commit hooks..."
	poetry run pre-commit install

runserver:
	cd backend && poetry run python manage.py runserver

shell:
	cd backend && poetry run python manage.py shell

# Production build
build-prod:
	docker build -t launchline-starter-backend:latest backend/

# Health checks
health:
	@echo "Checking service health..."
	@curl -f http://localhost/health/ || echo "Nginx not responding"
	@curl -f http://localhost/api/v2/pages/ || echo "Backend API not responding"

# Database backup and restore
backup-db:
	docker-compose -f ops/docker-compose.dev.yml exec db pg_dump -U postgres launchline_starter_dev > backup.sql

restore-db:
	docker-compose -f ops/docker-compose.dev.yml exec -T db psql -U postgres launchline_starter_dev < backup.sql

# Environment setup
init-dev:
	@echo "Initializing development environment..."
	make setup
	make up
	@echo "Waiting for services to start..."
	@sleep 10
	make migrate
	make seed
	@echo "Development environment ready!"

# Git hooks
install-hooks:
	poetry run pre-commit install
	poetry run pre-commit install --hook-type commit-msg

run-hooks:
	poetry run pre-commit run --all-files