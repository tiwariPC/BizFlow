# 🚀 BizFlow CI/CD Quick Start Guide

## ⚡ Get Started in 5 Minutes

This guide will help you set up CI/CD pipelines for BizFlow quickly and get your first deployment running.

## 📋 What You'll Get

- ✅ Automated testing and building
- ✅ Security vulnerability scanning
- ✅ Docker containerization
- ✅ Kubernetes deployment
- ✅ Multiple deployment platforms support
- ✅ Health checks and monitoring
- ✅ Rollback capabilities

## 🛠️ Quick Setup

### 1. Choose Your CI/CD Platform

#### Option A: GitHub Actions (Recommended)
```bash
# 1. Fork or clone the repository
git clone https://github.com/your-org/bizflow.git
cd bizflow

# 2. Configure secrets in GitHub
# Go to: Settings → Secrets and variables → Actions
# Add these secrets:
# - RAILWAY_TOKEN
# - VERCEL_TOKEN
# - VERCEL_ORG_ID
# - VERCEL_PROJECT_ID

# 3. Push to trigger pipeline
git push origin main
```

#### Option B: GitLab CI/CD
```bash
# 1. Push to GitLab repository
git push origin main

# 2. Configure variables in GitLab
# Go to: Settings → CI/CD → Variables
# Add: CI_REGISTRY_USER, CI_REGISTRY_PASSWORD
```

#### Option C: Jenkins
```bash
# 1. Install required plugins
# 2. Create pipeline job
# 3. Point to Jenkinsfile in repository
```

### 2. Deploy to Kubernetes

```bash
# 1. Make deployment script executable
chmod +x deploy.sh

# 2. Setup initial deployment
./deploy.sh setup

# 3. Build and deploy
./deploy.sh build v1.0.0
./deploy.sh push v1.0.0
./deploy.sh deploy-k8s production v1.0.0

# 4. Check deployment
kubectl get pods -n bizflow
kubectl get services -n bizflow
```

### 3. Deploy with Helm

```bash
# 1. Install Helm chart
helm install bizflow ./helm-chart \
  --namespace bizflow \
  --create-namespace

# 2. Upgrade deployment
helm upgrade bizflow ./helm-chart \
  --namespace bizflow \
  --values helm-chart/values-production.yaml
```

## 🔧 Configuration

### Environment Variables

Create `.env` files for different environments:

```bash
# .env.staging
NODE_ENV=staging
PORT=3000
DATABASE_URL=postgresql://user:pass@staging-db:5432/bizflow
JWT_SECRET=your-staging-secret

# .env.production
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@prod-db:5432/bizflow
JWT_SECRET=your-production-secret
```

### Kubernetes Secrets

```bash
# Create secrets
kubectl create secret generic bizflow-secrets \
  --from-literal=database-url="postgresql://user:pass@db:5432/bizflow" \
  --from-literal=jwt-secret="your-secret-key" \
  --namespace bizflow
```

## 🚀 Deployment Workflow

### Development Workflow
```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and test
npm run dev
npm run test

# 3. Push to trigger CI
git push origin feature/new-feature

# 4. Create pull request
# CI will run tests automatically
```

### Production Deployment
```bash
# 1. Merge to main branch
git checkout main
git merge feature/new-feature

# 2. Push to trigger production deployment
git push origin main

# 3. Monitor deployment
# Check GitHub Actions/GitLab CI dashboard
```

## 📊 Monitoring

### Health Checks
```bash
# Check application health
curl https://your-domain.com/api/health

# Check Kubernetes pods
kubectl get pods -n bizflow
kubectl logs -l app=bizflow -f
```

### Metrics
- Application metrics: `/metrics` endpoint
- Kubernetes metrics: `kubectl top pods -n bizflow`
- Resource usage: Monitor CPU/Memory in dashboard

## 🔄 Rollback

### Quick Rollback
```bash
# Kubernetes rollback
kubectl rollout undo deployment/bizflow-app -n bizflow

# Helm rollback
helm rollback bizflow -n bizflow

# Using deployment script
./deploy.sh rollback kubernetes
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Fails
```bash
# Check logs
kubectl logs -l app=bizflow --previous

# Verify dependencies
npm ci
npm run build
```

#### 2. Deployment Fails
```bash
# Check pod status
kubectl get pods -n bizflow
kubectl describe pod <pod-name> -n bizflow

# Check events
kubectl get events -n bizflow --sort-by='.lastTimestamp'
```

#### 3. Health Check Fails
```bash
# Check application logs
kubectl logs -l app=bizflow -f -n bizflow

# Test health endpoint
kubectl port-forward svc/bizflow-service 3000:80 -n bizflow
curl http://localhost:3000/api/health
```

## 📞 Support

### Quick Commands
```bash
# View all resources
kubectl get all -n bizflow

# View logs
kubectl logs -l app=bizflow -f -n bizflow

# Access application
kubectl port-forward svc/bizflow-service 3000:80 -n bizflow

# Scale deployment
kubectl scale deployment bizflow-app --replicas=5 -n bizflow
```

### Useful Links
- [Full CI/CD Documentation](./CI-CD-SETUP.md)
- [Application Documentation](./README.md)
- [Deployment Guide](./DEPLOYMENT.md)

## ✅ Success Checklist

- [ ] CI/CD pipeline is running
- [ ] Application builds successfully
- [ ] Tests are passing
- [ ] Security scans are clean
- [ ] Docker image is built and pushed
- [ ] Kubernetes deployment is running
- [ ] Health checks are passing
- [ ] Application is accessible
- [ ] Monitoring is set up
- [ ] Team is trained on deployment process

---

## 🎉 You're Ready!

Your BizFlow application now has a complete CI/CD pipeline!

**Next Steps:**
1. Customize the configuration for your environment
2. Set up monitoring and alerting
3. Configure backup procedures
4. Train your team on the deployment process

**Happy Deploying!** 🚀
