import { test, expect } from '@playwright/test';
test('admin can sign in and view the employee directory', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.getByRole('link', { name: /Employees/ }).click();
  await expect(page.getByRole('heading', { name: 'Employees' })).toBeVisible();
  await expect(page.getByText('Ayesha Khan')).toBeVisible();
});
