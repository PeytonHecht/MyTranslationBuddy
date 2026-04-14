import { test, expect } from '@playwright/test';

const navItem = (page: any, name: RegExp) =>
  page.getByRole('link', { name }).or(page.getByRole('button', { name }));

test.describe('Navigation routes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await expect(navItem(page, /^home$/i)).toBeVisible();
  });

  test('Explore nav -> /tips', async ({ page }) => {
    await navItem(page, /^explore$/i).click();
    await expect(page).toHaveURL(/\/tips$/);
    await expect(page.getByRole('heading', { name: /all destinations/i })).toBeVisible();
  });

  test('Study nav -> /reservations', async ({ page }) => {
    await navItem(page, /^study$/i).click();
    await expect(page).toHaveURL(/\/reservations$/);
    await expect(page.getByRole('heading', { name: /study hub/i })).toBeVisible();
  });

  test('Events nav -> /events', async ({ page }) => {
    await navItem(page, /^events$/i).click();
    await expect(page).toHaveURL(/\/events$/);
    await expect(page.getByText(/saved events/i)).toBeVisible();
  });

  test('Home nav -> /', async ({ page }) => {
    await navItem(page, /^events$/i).click();
    await expect(page).toHaveURL(/\/events$/);

    await navItem(page, /^home$/i).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('Profile nav -> profile page', async ({ page }) => {
    await navItem(page, /^profile$/i).click();
    await expect(page.getByText(/study abroad profile/i)).toBeVisible();
  });
});