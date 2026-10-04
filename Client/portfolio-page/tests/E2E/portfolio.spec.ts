// tests/e2e/portfolio.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Portfolio Core Interactions', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate and explicitly wait for initial network requests to settle
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should mount typewriter component and render visible text container', async ({ page }) => {
    const typewriter = page.locator('#typewriter');
    
    // Scroll element into view if offscreen
    await typewriter.scrollIntoViewIfNeeded();
    
    // Assert typewriter is mounted and visible in the DOM
    await expect(typewriter).toBeVisible();
  });

  test('should trigger hover state interactions on the user name element', async ({ page }) => {
    // Locate title element
    const nameHeading = page.locator('h1', { hasText: 'TIBOR' });
    
    await nameHeading.scrollIntoViewIfNeeded();
    await nameHeading.hover();
    
    // Assert heading remains visible and accessible during/after hover
    await expect(nameHeading).toBeVisible();
  });

  test('should reveal about section layout card upon scrolling down', async ({ page }) => {
    const aboutSection = page.locator('#about');
    const animatedCard = aboutSection.locator('div.max-w-4xl');

    // Scroll directly to the section target
    await aboutSection.scrollIntoViewIfNeeded();
    
    // Trigger scroll updates to ensure scroll listeners fire
    for (let i = 0; i < 4; i++) {
      await page.mouse.wheel(0, 300);
    }

    // Playwright automatically retries until timeout if element is transitioning in
    await expect(animatedCard).toBeVisible({ timeout: 5000 });
  });
});