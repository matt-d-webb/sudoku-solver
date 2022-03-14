import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test.describe('Home', () => {
  test('should show initial loaded state', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText("Sudoku Solver");
    await expect(page.locator('#solveBtn')).toHaveText("Solve");
    await expect(page.locator('#exampleBtn')).toHaveText("Example");
    await expect(page.locator('#clearBtn')).toHaveText("Clear");
  });
});


