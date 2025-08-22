# CI/CD Pipeline Setup & Testing Guide

## 🚀 Overview

This document provides comprehensive guidance for setting up and maintaining the CI/CD pipeline for BizFlow, including testing strategies, deployment procedures, and monitoring.

## 📋 Pipeline Stages

### 1. **Code Quality & Testing**
- **TypeScript Check**: Ensures type safety
- **ESLint**: Code linting and style enforcement
- **Prettier Check**: Code formatting validation
- **Unit Tests**: Component and utility testing with Vitest
- **Security Audit**: Vulnerability scanning

### 2. **Build & Package**
- **Build Application**: Production build with Vite
- **Docker Build**: Container image creation
- **Artifact Archiving**: Store build artifacts

### 3. **Testing & Validation**
- **E2E Tests**: Full user journey testing with Playwright
- **Integration Tests**: API and service testing
- **Performance Tests**: Load and stress testing

### 4. **Deployment**
- **Staging Deployment**: Automated deployment to staging environment
- **Production Deployment**: Manual approval for production
- **Health Checks**: Post-deployment validation

## 🧪 Testing Strategy

### **Unit Testing (Vitest)**
```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

**Coverage Targets:**
- **Statements**: 70%
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%

### **E2E Testing (Playwright)**
```bash
# Run E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Install browsers
npx playwright install --with-deps
```

**Test Categories:**
- **Authentication**: Login, registration, logout
- **Dashboard**: Navigation, user management
- **Core Features**: Compliance, finance, marketing
- **Responsive Design**: Mobile and tablet testing

### **Code Quality**
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Format code
npm run format
```

## 🔧 Jenkins Configuration

### **Required Plugins**
- NodeJS Plugin
- Docker Plugin
- HTML Publisher Plugin
- Email Extension Plugin
- Git Plugin

### **Environment Variables**
```bash
NODE_VERSION=20
DOCKER_IMAGE=bizflow-app
DOCKER_TAG=${BUILD_NUMBER}
REGISTRY=your-registry.com
```

### **Credentials**
- `docker-registry-credentials`: Docker registry access
- `email-credentials`: Email notification settings

## 🐳 Docker Configuration

### **Multi-stage Build**
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

### **Docker Commands**
```bash
# Build image
npm run docker:build

# Run container
npm run docker:run

# Run tests in container
npm run docker:test
```

## 📊 Monitoring & Reporting

### **Test Reports**
- **Coverage Report**: HTML coverage report
- **E2E Test Report**: Playwright test results
- **Security Report**: Vulnerability scan results

### **Build Metrics**
- **Build Duration**: Time tracking
- **Test Results**: Pass/fail statistics
- **Coverage Trends**: Historical coverage data

### **Deployment Metrics**
- **Deployment Frequency**: How often deployments occur
- **Lead Time**: Time from commit to production
- **Mean Time to Recovery**: Time to fix issues

## 🔒 Security

### **Security Scanning**
```bash
# Run security audit
npm run security:audit

# Fix security issues
npm run security:fix

# Trivy vulnerability scan
docker run --rm -v ${WORKSPACE}:/app aquasec/trivy:latest \
  fs --format sarif --output trivy-results.sarif /app
```

### **Security Best Practices**
- **Dependency Scanning**: Regular vulnerability checks
- **Container Scanning**: Image security validation
- **Code Scanning**: Static analysis for security issues
- **Secret Management**: Secure credential handling

## 🚀 Deployment Environments

### **Staging Environment**
- **Purpose**: Pre-production testing
- **Deployment**: Automatic on develop branch
- **URL**: `https://staging.bizflow.com`
- **Database**: Staging database with test data

### **Production Environment**
- **Purpose**: Live application
- **Deployment**: Manual approval on main branch
- **URL**: `https://bizflow.com`
- **Database**: Production database

### **Environment Variables**
```bash
# Staging
NODE_ENV=staging
DATABASE_URL=postgresql://staging:pass@staging-db:5432/bizflow_staging
REDIS_URL=redis://staging-redis:6379

# Production
NODE_ENV=production
DATABASE_URL=postgresql://prod:pass@prod-db:5432/bizflow_prod
REDIS_URL=redis://prod-redis:6379
```

## 📈 Performance Monitoring

### **Application Metrics**
- **Response Time**: API endpoint performance
- **Throughput**: Requests per second
- **Error Rate**: Percentage of failed requests
- **Resource Usage**: CPU, memory, disk usage

### **User Experience Metrics**
- **Page Load Time**: Frontend performance
- **Time to Interactive**: User interaction readiness
- **Core Web Vitals**: Google's performance metrics

## 🔄 Rollback Strategy

### **Automated Rollback**
- **Health Check Failure**: Automatic rollback on health check failure
- **Performance Degradation**: Rollback if performance metrics degrade
- **Error Rate Threshold**: Rollback if error rate exceeds threshold

### **Manual Rollback**
```bash
# Rollback to previous version
kubectl rollout undo deployment/bizflow-app

# Rollback to specific version
kubectl rollout undo deployment/bizflow-app --to-revision=2
```

## 📧 Notifications

### **Success Notifications**
- **Email**: Development team notification
- **Slack**: Channel notification
- **Status Page**: Public status update

### **Failure Notifications**
- **Immediate Alert**: Critical failure notification
- **Escalation**: Manager notification for repeated failures
- **Status Page**: Public incident notification

## 🛠️ Troubleshooting

### **Common Issues**

#### **Build Failures**
```bash
# Check build logs
docker logs bizflow-app

# Verify dependencies
npm audit

# Check TypeScript errors
npm run type-check
```

#### **Test Failures**
```bash
# Run tests locally
npm run test

# Check test coverage
npm run test:coverage

# Debug E2E tests
npm run test:e2e:ui
```

#### **Deployment Issues**
```bash
# Check deployment status
kubectl get pods -l app=bizflow-app

# Check logs
kubectl logs deployment/bizflow-app

# Check health endpoint
curl -f https://bizflow.com/api/health
```

### **Performance Issues**
```bash
# Check resource usage
kubectl top pods

# Check database performance
kubectl exec -it db-pod -- psql -c "SELECT * FROM pg_stat_activity;"

# Check application metrics
curl https://bizflow.com/api/metrics
```

## 📚 Best Practices

### **Development**
- **Feature Branches**: Use feature branches for development
- **Pull Requests**: Require PR reviews before merge
- **Commit Messages**: Use conventional commit format
- **Code Review**: Mandatory code review process

### **Testing**
- **Test Coverage**: Maintain minimum 70% coverage
- **Test Isolation**: Ensure tests are independent
- **Mock External Services**: Mock external dependencies
- **Performance Testing**: Regular performance validation

### **Deployment**
- **Blue-Green Deployment**: Zero-downtime deployments
- **Canary Releases**: Gradual rollout for new features
- **Feature Flags**: Control feature availability
- **Monitoring**: Comprehensive monitoring and alerting

### **Security**
- **Regular Updates**: Keep dependencies updated
- **Security Scanning**: Regular vulnerability scans
- **Access Control**: Principle of least privilege
- **Audit Logging**: Comprehensive audit trails

## 🔗 Useful Links

- **Jenkins Dashboard**: `https://jenkins.bizflow.com`
- **Test Reports**: `https://jenkins.bizflow.com/job/bizflow/lastSuccessfulBuild/`
- **Coverage Report**: `https://jenkins.bizflow.com/job/bizflow/lastSuccessfulBuild/coverage/`
- **E2E Test Report**: `https://jenkins.bizflow.com/job/bizflow/lastSuccessfulBuild/test-results/`
- **Status Page**: `https://status.bizflow.com`
- **Documentation**: `https://docs.bizflow.com`

---

**Last Updated**: August 2024
**Version**: 1.0.0
**Maintainer**: DevOps Team
