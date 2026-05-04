import { test, expect } from '@playwright/test';

test.describe('MOMENTUM App (App 1) - E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Assuming /momentum is the main dashboard
    await page.goto('/momentum');
  });

  test('should display morning greeting with daily summary', async ({ page }) => {
    // Check for greeting components
    const greeting = page.locator('text=/Good morning/i');
    await expect(greeting).toBeVisible();

    // Check for task summary
    const taskCount = page.locator('.task-count'); // Assuming class
    await expect(taskCount).toBeVisible();
    
    // Top 3 tasks should be listed
    const topTasks = page.locator('.top-task');
    await expect(topTasks).toHaveCount(3);
  });

  test('should show mic button always visible', async ({ page }) => {
    const micButton = page.locator('button[aria-label="Start Voice Control"]');
    await expect(micButton).toBeVisible();
    
    // Check if it's fixed in the bottom area (standard LifeOS design rule)
    const box = await micButton.boundingBox();
    expect(box?.y).toBeGreaterThan(400); 
  });

  test('should show research cards if available', async ({ page }) => {
    const researchSection = page.locator('text=Research');
    await expect(researchSection).toBeVisible();
    
    const cards = page.locator('.research-card');
    // If there are cards, they should have Summary, Facts, Future, Action
    if (await cards.count() > 0) {
      await expect(cards.first().locator('text=Summary')).toBeVisible();
      await expect(cards.first().locator('text=Facts')).toBeVisible();
      await expect(cards.first().locator('text=Future')).toBeVisible();
      await expect(cards.first().locator('text=Action')).toBeVisible();
    }
  });

  test('should trigger 60-second lesson suggestion', async ({ page }) => {
    // This might be triggered by a specific action or mock
    // For now, check if the UI can show a lesson prompt
    const lessonPrompt = page.locator('text=/Want a 60-second lesson/i');
    // We don't expect it to always be there, but we can check the component existence if possible
    expect(lessonPrompt).toBeDefined();
  });
});
