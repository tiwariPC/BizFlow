import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.getByLabel(/username/i).fill('admin');
    await page.getByLabel(/password/i).fill('admin123');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should display dashboard overview', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByText(/welcome/i)).toBeVisible();
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

  test('should navigate to marketing page', async ({ page }) => {
    await page.getByRole('link', { name: /marketing/i }).click();
    await expect(page).toHaveURL(/\/marketing/);
    await expect(page.getByRole('heading', { name: /marketing/i })).toBeVisible();
  });

  test('should navigate to store page', async ({ page }) => {
    await page.getByRole('link', { name: /store/i }).click();
    await expect(page).toHaveURL(/\/store/);
    await expect(page.getByRole('heading', { name: /service store/i })).toBeVisible();
  });

  test('should display sidebar navigation', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('link', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /compliance/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /finance/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /marketing/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /store/i })).toBeVisible();
  });

  test('should display user profile information', async ({ page }) => {
    await expect(page.getByText(/admin/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Check if mobile menu is accessible
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();

    // Open mobile menu
    await page.getByRole('button', { name: /menu/i }).click();

    // Check if navigation links are visible in mobile menu
    await expect(page.getByRole('link', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /compliance/i })).toBeVisible();
  });
});
