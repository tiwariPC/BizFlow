# BizFlow CI/CD Pipeline Setup Guide

## 🚀 Overview

This document provides comprehensive setup instructions for implementing CI/CD pipelines for the BizFlow Business Solutions Platform. We've implemented multiple CI/CD solutions to support different deployment scenarios and team preferences.

## 📋 Implemented CI/CD Solutions

### 1. GitHub Actions (Primary)
- **File**: `.github/workflows/ci-cd.yml`
- **Features**: Multi-stage pipeline with testing, building, security scanning, and deployment
- **Platforms**: Railway, Vercel, DigitalOcean App Platform

### 2. GitLab CI/CD
- **File**: `.gitlab-ci.yml`
- **Features**: Parallel testing, Docker builds, security scanning
- **Deployment**: Webhook-based deployments

### 3. Jenkins Pipeline
- **File**: `Jenkinsfile`
- **Features**: Declarative pipeline with parallel stages, notifications
- **Deployment**: Kubernetes, Docker registry

### 4. Kubernetes Deployment
- **File**: `k8s/deployment.yaml`
- **Features**: Production-ready K8s manifests with HPA, ingress, secrets

### 5. Helm Chart
- **Directory**: `helm-chart/`
- **Features**: Configurable deployment with values.yaml

## 🔧 Prerequisites

### Required Tools
```bash
# Node.js and npm
node --version  # v20+
npm --version   # 9+

# Docker
docker --version

# Kubernetes (for K8s deployment)
kubectl version

# Helm (for Helm deployment)
helm version
```

### Required Accounts & Tokens
- GitHub repository with Actions enabled
- Docker registry (GitHub Container Registry, Docker Hub, etc.)
- Deployment platform accounts (Railway, Vercel, DigitalOcean, etc.)

## 🛠️ Setup Instructions

### 1. GitHub Actions Setup

#### Step 1: Configure Repository Secrets
Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

```bash
# Railway
RAILWAY_TOKEN=your_railway_token
RAILWAY_STAGING_SERVICE=your_staging_service_id
RAILWAY_PRODUCTION_SERVICE=your_production_service_id

# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# DigitalOcean
DIGITALOCEAN_ACCESS_TOKEN=your_do_token
DO_APP_NAME=your_app_name

# Slack (optional)
SLACK_WEBHOOK_URL=your_slack_webhook

# Production URL
PRODUCTION_URL=https://your-domain.com
```

#### Step 2: Enable Environments
Create environments in GitHub:
1. Go to Settings → Environments
2. Create `staging` and `production` environments
3. Add protection rules if needed

#### Step 3: Test the Pipeline
```bash
# Push to develop branch for staging deployment
git checkout -b develop
git push origin develop

# Push to main branch for production deployment
git checkout main
git push origin main
```

### 2. GitLab CI/CD Setup

#### Step 1: Configure GitLab Variables
Go to Settings → CI/CD → Variables, and add:

```bash
# Registry credentials
CI_REGISTRY_USER=your_registry_user
CI_REGISTRY_PASSWORD=your_registry_password

# Deployment webhooks
STAGING_WEBHOOK_URL=https://your-staging-platform.com/webhook
PRODUCTION_WEBHOOK_URL=https://your-production-platform.com/webhook

# Production URL
PRODUCTION_URL=https://your-domain.com
```

#### Step 2: Test the Pipeline
```bash
# Push to develop branch
git push origin develop

# Create merge request to main
git checkout -b feature/test-pipeline
git push origin feature/test-pipeline
# Create MR in GitLab UI
```

### 3. Jenkins Setup

#### Step 1: Install Required Plugins
- NodeJS Plugin
- Docker Pipeline Plugin
- Kubernetes Plugin
- Email Extension Plugin
- SARIF Plugin

#### Step 2: Configure Jenkins Credentials
1. Go to Manage Jenkins → Credentials
2. Add Docker registry credentials
3. Add deployment platform credentials

#### Step 3: Configure Node.js Tool
1. Go to Manage Jenkins → Tools
2. Add NodeJS installation named "NodeJS-20"

#### Step 4: Create Pipeline Job
1. Create new Pipeline job
2. Configure to use Jenkinsfile from SCM
3. Set branch to `main`

### 4. Kubernetes Deployment

#### Step 1: Prepare Secrets
```bash
# Create base64 encoded secrets
echo -n "your-database-url" | base64
echo -n "your-jwt-secret" | base64
echo -n "your-smtp-password" | base64

# Update k8s/deployment.yaml with actual values
```

#### Step 2: Deploy to Kubernetes
```bash
# Apply the deployment
kubectl apply -f k8s/deployment.yaml

# Check deployment status
kubectl get pods -l app=bizflow
kubectl get services -l app=bizflow
kubectl get ingress -l app=bizflow
```

### 5. Helm Chart Deployment

#### Step 1: Install Helm Chart
```bash
# Add Helm repository (if using external repo)
helm repo add bizflow https://your-helm-repo.com

# Install the chart
helm install bizflow ./helm-chart \
  --namespace bizflow \
  --create-namespace \
  --values values-production.yaml
```

#### Step 2: Create Environment-Specific Values
```bash
# values-staging.yaml
replicaCount: 2
image:
  tag: "staging"
env:
  NODE_ENV: "staging"

# values-production.yaml
replicaCount: 3
image:
  tag: "latest"
env:
  NODE_ENV: "production"
```

## 🔄 Pipeline Workflow

### Development Workflow
1. **Feature Branch**: Create feature branch from `develop`
2. **Development**: Make changes and test locally
3. **Pull Request**: Create PR to `develop` branch
4. **CI Checks**: GitHub Actions/GitLab CI runs tests
5. **Code Review**: Team reviews and approves
6. **Merge**: Merge to `develop` triggers staging deployment

### Production Workflow
1. **Release Branch**: Create release branch from `develop`
2. **Testing**: Run full test suite
3. **Pull Request**: Create PR to `main` branch
4. **CI/CD Pipeline**: Full pipeline runs
5. **Deployment**: Automatic deployment to production
6. **Health Check**: Post-deployment verification

## 🔒 Security Considerations

### Secrets Management
- Use environment-specific secrets
- Rotate secrets regularly
- Use external secret management (HashiCorp Vault, AWS Secrets Manager)
- Never commit secrets to version control

### Security Scanning
- Trivy vulnerability scanning in all pipelines
- SAST (Static Application Security Testing)
- Dependency vulnerability scanning
- Container image scanning

### Access Control
- Use least privilege principle
- Implement RBAC in Kubernetes
- Use service accounts for deployments
- Audit access logs regularly

## 📊 Monitoring & Observability

### Health Checks
```bash
# Application health endpoint
curl https://your-domain.com/api/health

# Kubernetes health checks
kubectl get pods -l app=bizflow
kubectl describe pod <pod-name>
```

### Logging
```bash
# View application logs
kubectl logs -l app=bizflow -f

# View ingress logs
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx
```

### Metrics
- Prometheus metrics endpoint: `/metrics`
- Grafana dashboards for monitoring
- Kubernetes resource monitoring
- Application performance monitoring

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check build logs
kubectl logs -l app=bizflow --previous

# Verify dependencies
npm ci
npm run build
```

#### 2. Deployment Failures
```bash
# Check pod status
kubectl get pods -l app=bizflow

# Check events
kubectl describe pod <pod-name>

# Check ingress
kubectl get ingress
kubectl describe ingress bizflow-ingress
```

#### 3. Health Check Failures
```bash
# Check application logs
kubectl logs -l app=bizflow

# Test health endpoint directly
kubectl port-forward svc/bizflow-service 3000:80
curl http://localhost:3000/api/health
```

### Rollback Procedures
```bash
# Kubernetes rollback
kubectl rollout undo deployment/bizflow-app

# Helm rollback
helm rollback bizflow 1

# Docker image rollback
kubectl set image deployment/bizflow-app bizflow-app=bizflow-app:previous-tag
```

## 📈 Scaling & Performance

### Horizontal Pod Autoscaler
- CPU target: 70%
- Memory target: 80%
- Min replicas: 3
- Max replicas: 10

### Resource Limits
- CPU: 500m (0.5 cores)
- Memory: 512Mi

### Performance Optimization
- Enable gzip compression
- Use CDN for static assets
- Implement caching strategies
- Database connection pooling

## 🔄 Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Rotate secrets quarterly
- [ ] Review security scans weekly
- [ ] Monitor resource usage daily
- [ ] Backup database daily
- [ ] Update SSL certificates before expiry

### Backup Strategy
- Database backups: Daily automated backups
- Configuration backups: Version controlled
- Application backups: Docker images in registry
- Disaster recovery: Multi-region deployment

## 📞 Support

### Team Contacts
- **DevOps Team**: devops@bizflow.com
- **Development Team**: dev@bizflow.com
- **Emergency Contact**: +1-555-0123

### Documentation
- [Application Documentation](./README.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [API Documentation](./docs/api.md)

---

## ✅ Setup Checklist

- [ ] GitHub Actions configured with secrets
- [ ] GitLab CI/CD variables set (if using GitLab)
- [ ] Jenkins pipeline configured (if using Jenkins)
- [ ] Kubernetes cluster ready
- [ ] Helm chart tested
- [ ] Docker registry configured
- [ ] Monitoring and logging set up
- [ ] Security scanning enabled
- [ ] Backup procedures tested
- [ ] Team trained on deployment procedures

**BizFlow CI/CD is now ready for production deployment!** 🚀
