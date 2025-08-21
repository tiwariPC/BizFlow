#!/bin/bash

# BizFlow Deployment Script
# This script provides easy deployment commands for different environments

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="bizflow"
NAMESPACE="bizflow"
DOCKER_REGISTRY="ghcr.io"
IMAGE_NAME="${DOCKER_REGISTRY}/${APP_NAME}"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_prerequisites() {
    log_info "Checking prerequisites..."

    # Check if required tools are installed
    command -v docker >/dev/null 2>&1 || { log_error "Docker is required but not installed."; exit 1; }
    command -v kubectl >/dev/null 2>&1 || { log_error "kubectl is required but not installed."; exit 1; }
    command -v helm >/dev/null 2>&1 || { log_error "Helm is required but not installed."; exit 1; }

    log_success "All prerequisites are satisfied"
}

build_docker_image() {
    local tag=$1
    log_info "Building Docker image with tag: $tag"

    docker build -t "${IMAGE_NAME}:${tag}" .
    log_success "Docker image built successfully"
}

push_docker_image() {
    local tag=$1
    log_info "Pushing Docker image with tag: $tag"

    docker push "${IMAGE_NAME}:${tag}"
    log_success "Docker image pushed successfully"
}

deploy_to_kubernetes() {
    local environment=$1
    local tag=$2

    log_info "Deploying to Kubernetes ($environment) with tag: $tag"

    # Create namespace if it doesn't exist
    kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

    # Update image tag in deployment
    kubectl set image deployment/${APP_NAME}-app ${APP_NAME}-app="${IMAGE_NAME}:${tag}" -n $NAMESPACE

    # Apply Kubernetes manifests
    kubectl apply -f k8s/deployment.yaml -n $NAMESPACE

    # Wait for deployment to be ready
    kubectl rollout status deployment/${APP_NAME}-app -n $NAMESPACE --timeout=300s

    log_success "Deployment to Kubernetes completed successfully"
}

deploy_with_helm() {
    local environment=$1
    local values_file="helm-chart/values-${environment}.yaml"

    log_info "Deploying with Helm ($environment)"

    if [ ! -f "$values_file" ]; then
        log_warning "Values file $values_file not found, using default values"
        values_file="helm-chart/values.yaml"
    fi

    helm upgrade --install $APP_NAME ./helm-chart \
        --namespace $NAMESPACE \
        --create-namespace \
        --values $values_file \
        --wait \
        --timeout 10m

    log_success "Helm deployment completed successfully"
}

health_check() {
    local url=$1
    local max_attempts=30
    local attempt=1

    log_info "Performing health check on: $url"

    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "$url/api/health" >/dev/null 2>&1; then
            log_success "Health check passed!"
            return 0
        fi

        log_info "Health check attempt $attempt/$max_attempts failed, retrying in 10 seconds..."
        sleep 10
        ((attempt++))
    done

    log_error "Health check failed after $max_attempts attempts"
    return 1
}

rollback() {
    local environment=$1

    log_info "Rolling back deployment ($environment)"

    if [ "$environment" = "kubernetes" ]; then
        kubectl rollout undo deployment/${APP_NAME}-app -n $NAMESPACE
        kubectl rollout status deployment/${APP_NAME}-app -n $NAMESPACE
    elif [ "$environment" = "helm" ]; then
        helm rollback $APP_NAME -n $NAMESPACE
    fi

    log_success "Rollback completed successfully"
}

show_help() {
    echo "BizFlow Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  build [tag]                    Build Docker image with specified tag"
    echo "  push [tag]                     Push Docker image with specified tag"
    echo "  deploy-k8s [env] [tag]         Deploy to Kubernetes (env: staging/production)"
    echo "  deploy-helm [env]              Deploy with Helm (env: staging/production)"
    echo "  health-check [url]             Perform health check on specified URL"
    echo "  rollback [env]                 Rollback deployment (env: kubernetes/helm)"
    echo "  setup                          Setup initial deployment"
    echo "  help                           Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build v1.0.0"
    echo "  $0 push v1.0.0"
    echo "  $0 deploy-k8s staging v1.0.0"
    echo "  $0 deploy-helm production"
    echo "  $0 health-check https://bizflow.com"
    echo "  $0 rollback kubernetes"
}

setup_initial_deployment() {
    log_info "Setting up initial deployment..."

    check_prerequisites

    # Create namespace
    kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

    # Apply initial Kubernetes manifests
    kubectl apply -f k8s/deployment.yaml -n $NAMESPACE

    # Install Helm chart
    helm upgrade --install $APP_NAME ./helm-chart \
        --namespace $NAMESPACE \
        --create-namespace \
        --wait \
        --timeout 10m

    log_success "Initial deployment setup completed"
}

# Main script logic
case "${1:-help}" in
    "build")
        if [ -z "${2:-}" ]; then
            log_error "Tag is required for build command"
            exit 1
        fi
        build_docker_image "$2"
        ;;
    "push")
        if [ -z "${2:-}" ]; then
            log_error "Tag is required for push command"
            exit 1
        fi
        push_docker_image "$2"
        ;;
    "deploy-k8s")
        if [ -z "${2:-}" ] || [ -z "${3:-}" ]; then
            log_error "Environment and tag are required for deploy-k8s command"
            exit 1
        fi
        deploy_to_kubernetes "$2" "$3"
        ;;
    "deploy-helm")
        if [ -z "${2:-}" ]; then
            log_error "Environment is required for deploy-helm command"
            exit 1
        fi
        deploy_with_helm "$2"
        ;;
    "health-check")
        if [ -z "${2:-}" ]; then
            log_error "URL is required for health-check command"
            exit 1
        fi
        health_check "$2"
        ;;
    "rollback")
        if [ -z "${2:-}" ]; then
            log_error "Environment is required for rollback command"
            exit 1
        fi
        rollback "$2"
        ;;
    "setup")
        setup_initial_deployment
        ;;
    "help"|*)
        show_help
        ;;
esac
