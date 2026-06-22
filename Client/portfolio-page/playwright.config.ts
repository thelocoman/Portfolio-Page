import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  testMatch: ['**/*.spec.{ts,tsx}'],
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only to catch flaky tests */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI to prevent database/resource choking. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. 'html' creates a local dashboard you can open in your browser */
  reporter: 'html',
  
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` instead of hardcoding 'http://localhost:3000/' everywhere. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying a failed test so you can visually debug what went wrong. */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
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

  /* Automatically spin up your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',            // Changed from 'start' to 'dev' so you don't have to 'npm run build' before testing
    url: 'http://localhost:3000',       // Playwright monitors this port until it is active, then starts tests
    reuseExistingServer: !process.env.CI, // If you already have 'npm run dev' running in another terminal, use it instead of booting a new one
    timeout: 120 * 1000,               // Gives Next.js ample time to compile on slower systems or CI environments
  },
});