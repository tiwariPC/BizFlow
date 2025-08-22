import { chromium, FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Clean up test data or perform any global cleanup
  console.log('Cleaning up global test environment...');

  // You can add any global cleanup here, such as:
  // - Removing test users
  // - Cleaning up test data
  // - Resetting database state
  // - Cleaning up files

  await browser.close();
}

export default globalTeardown;
