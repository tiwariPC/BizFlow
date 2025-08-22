# Testing Guide for BizFlow

## 🧪 Overview

This document provides comprehensive guidance for testing the BizFlow Business Solutions Platform, including unit tests, integration tests, end-to-end tests, and testing best practices.

## 📋 Testing Strategy

### **Testing Pyramid**
```
    /\
   /  \     E2E Tests (Few)
  /____\    Integration Tests (Some)
 /______\   Unit Tests (Many)
```

### **Test Types**
- **Unit Tests**: Individual components and functions
- **Integration Tests**: API endpoints and service interactions
- **E2E Tests**: Full user journeys
- **Accessibility Tests**: A11y compliance
- **Performance Tests**: Load and stress testing

## 🛠️ Testing Tools

### **Unit Testing (Vitest)**
- **Framework**: Vitest (Vite-native testing framework)
- **Assertions**: Built-in assertions + @testing-library/jest-dom
- **Coverage**: V8 coverage provider
- **UI**: Vitest UI for interactive testing

### **E2E Testing (Playwright)**
- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, Safari
- **Devices**: Desktop and mobile testing
- **Parallel**: Parallel test execution

### **Code Quality**
- **Linting**: ESLint with TypeScript and React rules
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode

## 🚀 Getting Started

### **Installation**
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### **Running Tests**
```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## 📝 Unit Testing

### **Component Testing**

#### **Example: Button Component Test**
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

#### **Example: Form Component Test**
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoginForm } from './login-form';

describe('LoginForm', () => {
  it('submits form with valid data', async () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
    });
  });

  it('shows validation errors for invalid data', async () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });
});
```

### **Hook Testing**

#### **Example: Custom Hook Test**
```typescript
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCounter } from './use-counter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('increments counter', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('decrements counter', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });
});
```

### **Utility Function Testing**

#### **Example: Utility Function Test**
```typescript
import { describe, it, expect } from 'vitest';
import { formatCurrency, validateEmail } from './utils';

describe('formatCurrency', () => {
  it('formats positive numbers', () => {
    expect(formatCurrency(1234.56)).toBe('₹1,234.56');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('₹0.00');
  });

  it('formats negative numbers', () => {
    expect(formatCurrency(-1234.56)).toBe('-₹1,234.56');
  });
});

describe('validateEmail', () => {
  it('validates correct email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
  });
});
```

## 🔗 Integration Testing

### **API Testing**

#### **Example: API Endpoint Test**
```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer } from '../server';

describe('API Endpoints', () => {
  let server: any;

  beforeAll(() => {
    server = createServer();
  });

  afterAll(() => {
    server.close();
  });

  it('GET /api/health returns healthy status', async () => {
    const response = await fetch('http://localhost:3000/api/health');
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.status).toBe('healthy');
  });

  it('POST /api/auth/login with valid credentials', async () => {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123',
      }),
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.token).toBeDefined();
  });
});
```

## 🌐 End-to-End Testing

### **Authentication Tests**

#### **Example: Login Flow Test**
```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.getByLabel(/username/i).fill('admin');
    await page.getByLabel(/password/i).fill('admin123');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText(/welcome/i)).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.getByLabel(/username/i).fill('invalid');
    await page.getByLabel(/password/i).fill('invalid');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });
});
```

### **Dashboard Tests**

#### **Example: Navigation Test**
```typescript
import { test, expect } from '@playwright/test';

test.describe('Dashboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.getByLabel(/username/i).fill('admin');
    await page.getByLabel(/password/i).fill('admin123');
    await page.getByRole('button', { name: /sign in/i }).click();
  });

  test('should navigate to compliance page', async ({ page }) => {
    await page.getByRole('link', { name: /compliance/i }).click();
    await expect(page).toHaveURL(/\/compliance/);
    await expect(page.getByRole('heading', { name: /compliance/i })).toBeVisible();
  });

  test('should navigate to finance page', async ({ page }) => {
    await page.getByRole('link', { name: /finance/i }).click();
    await expect(page).toHaveURL(/\/finance/);
    await expect(page.getByRole('heading', { name: /finance/i })).toBeVisible();
  });
});
```

### **Responsive Design Tests**

#### **Example: Mobile Testing**
```typescript
import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness', () => {
  test('should display mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    
    // Check if mobile menu button is visible
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();
    
    // Open mobile menu
    await page.getByRole('button', { name: /menu/i }).click();
    
    // Check if navigation links are visible
    await expect(page.getByRole('link', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /compliance/i })).toBeVisible();
  });
});
```

## ♿ Accessibility Testing

### **Automated A11y Testing**

#### **Example: Accessibility Test**
```typescript
import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should meet accessibility standards', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for alt text on images
    const images = page.locator('img');
    for (let i = 0; i < await images.count(); i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Check for proper form labels
    const inputs = page.locator('input');
    for (let i = 0; i < await inputs.count(); i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeVisible();
      }
    }
  });
});
```

## 📊 Performance Testing

### **Load Testing**

#### **Example: Performance Test**
```typescript
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should load dashboard within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
  });

  test('should handle multiple concurrent users', async ({ browser }) => {
    const promises = [];
    
    // Simulate 10 concurrent users
    for (let i = 0; i < 10; i++) {
      const context = await browser.newContext();
      const page = await context.newPage();
      
      promises.push(
        page.goto('/dashboard').then(() => {
          return page.getByText(/welcome/i).isVisible();
        })
      );
    }
    
    const results = await Promise.all(promises);
    expect(results.every(result => result)).toBe(true);
  });
});
```

## 🧹 Test Organization

### **File Structure**
```
├── client/src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   └── button.test.tsx
│   │   └── layout/
│   │       ├── dashboard-layout.tsx
│   │       └── dashboard-layout.test.tsx
│   ├── pages/
│   │   ├── dashboard.tsx
│   │   └── dashboard.test.tsx
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   └── use-auth.test.ts
│   └── lib/
│       ├── utils.ts
│       └── utils.test.ts
├── e2e/
│   ├── auth.spec.ts
│   ├── dashboard.spec.ts
│   └── navigation.spec.ts
└── server/
    ├── routes.ts
    └── routes.test.ts
```

### **Test Naming Conventions**
```typescript
// Component tests: component-name.test.tsx
// Hook tests: hook-name.test.ts
// Utility tests: utility-name.test.ts
// E2E tests: feature-name.spec.ts
// API tests: endpoint-name.test.ts
```

## 🔧 Test Configuration

### **Vitest Configuration**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
  },
});
```

### **Playwright Configuration**
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

## 📈 Coverage Reports

### **Coverage Targets**
- **Statements**: 70%
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%

### **Generating Reports**
```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/index.html
```

## 🚨 Common Testing Patterns

### **Mocking**
```typescript
// Mock API calls
vi.mock('../api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: 1, name: 'Test User' })),
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;
```

### **Testing Async Code**
```typescript
it('should handle async operations', async () => {
  const { result } = renderHook(() => useAsyncData());
  
  // Wait for async operation to complete
  await waitFor(() => {
    expect(result.current.data).toBeDefined();
  });
  
  expect(result.current.loading).toBe(false);
});
```

### **Testing Error States**
```typescript
it('should handle error states', async () => {
  // Mock API to throw error
  vi.mocked(fetchUser).mockRejectedValue(new Error('API Error'));
  
  const { result } = renderHook(() => useAsyncData());
  
  await waitFor(() => {
    expect(result.current.error).toBeDefined();
  });
  
  expect(result.current.error.message).toBe('API Error');
});
```

## 🔍 Debugging Tests

### **Debugging Unit Tests**
```bash
# Run tests in debug mode
npm run test -- --debug

# Run specific test file
npm run test button.test.tsx

# Run tests with verbose output
npm run test -- --verbose
```

### **Debugging E2E Tests**
```bash
# Run E2E tests with UI
npm run test:e2e:ui

# Run specific E2E test
npm run test:e2e auth.spec.ts

# Run tests in headed mode
npx playwright test --headed
```

### **Debugging with VS Code**
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["run", "--reporter=verbose"],
      "console": "integratedTerminal"
    }
  ]
}
```

## 📚 Best Practices

### **Test Organization**
- Group related tests using `describe` blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Keep tests independent and isolated

### **Test Data**
- Use factories for creating test data
- Avoid hardcoded values in tests
- Use meaningful test data
- Clean up test data after tests

### **Assertions**
- Use specific assertions
- Test one thing per test
- Use descriptive assertion messages
- Avoid testing implementation details

### **Performance**
- Mock external dependencies
- Use efficient selectors
- Avoid unnecessary renders
- Use test data builders

## 🚀 CI/CD Integration

### **GitHub Actions**
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run test:e2e
```

### **Jenkins Pipeline**
```groovy
// Jenkinsfile
stage('Testing') {
  parallel {
    stage('Unit Tests') {
      steps {
        sh 'npm run test:coverage'
      }
    }
    stage('E2E Tests') {
      steps {
        sh 'npx playwright install --with-deps'
        sh 'npm run test:e2e'
      }
    }
  }
}
```

## 📞 Support

### **Getting Help**
- **Documentation**: Check this guide and project README
- **Issues**: Report bugs in the project repository
- **Community**: Ask questions in project discussions

### **Useful Commands**
```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Check code quality
npm run lint

# Format code
npm run format
```

---

**Last Updated**: August 2024  
**Version**: 1.0.0  
**Maintainer**: Development Team
