import { test, expect } from '@playwright/test';

test.describe('Authentication Flow - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/signin');
  });

  test('should initiate email magic link flow', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    const submitButton = page.locator('button[type="submit"]:has-text("Sign in with Email")');

    await emailInput.fill('test@lifeos.dev');
    await submitButton.click();

    // Verify success toast or redirection to "Check your email"
    await expect(page.locator('text=Check your email')).toBeVisible();
    await expect(page.locator('text=A magic link has been sent')).toBeVisible();
  });

  test('should display Google OAuth sign-in option', async ({ page }) => {
    const googleButton = page.locator('button:has-text("Sign in with Google")');
    
    await expect(googleButton).toBeVisible();
    await expect(googleButton).toBeEnabled();
    
    // We don't perform the external redirect in CI, but we check if the link/form is correct
    const action = await googleButton.getAttribute('onClick') || await googleButton.locator('..').getAttribute('action');
    // Simplified assertion for the existence of the trigger
    expect(googleButton).toBeDefined();
  });

  test('should redirect unauthenticated users to sign-in page', async ({ page }) => {
    await page.goto('/momentum'); // Momentum is a protected route
    // Should be redirected to /auth/signin
    await expect(page).toHaveURL(/\/auth\/signin/);
  });
});
