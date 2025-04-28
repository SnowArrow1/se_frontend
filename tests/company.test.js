import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 600,
    width: 800
  }
});

test('Admin CRUD operations for Company Profiles', { timeout: 60000 }, async ({ page }) => {
  // Step 1: Navigate to the website
  await page.goto('https://se-frontend-pi-nine.vercel.app/');
  
  // Step 2: Admin Login
  await page.getByRole('link', { name: 'Sign-In' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com');
  await page.getByRole('textbox', { name: 'password' }).fill('12345678');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Step 3: Navigate to Company List
  await page.getByRole('link', { name: 'Company List' }).click();

  // Step 4: Add a new company profile
  await page.getByRole('button', { name: 'Add New Company' }).waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Add New Company' }).click();
  
  // Fill in company details
  await page.getByRole('textbox', { name: 'Company Name' }).fill('Test Company');
  await page.getByRole('textbox', { name: 'Address' }).fill('123 Test Address');
  await page.getByRole('textbox', { name: 'Website' }).fill('https://testcompany.com');
  await page.getByRole('textbox', { name: 'description' }).fill('This is a test company.');
  await page.getByRole('combobox', { name: 'Company Size' }).selectOption('-200 employees');
  await page.getByRole('button', { name: 'Create Company' }).click();

  // Verify the company was created
  await expect(page.getByRole('link', { name: 'Test Company' })).toBeVisible();

  // Step 5: Edit the company profile
  await page.getByRole('link', { name: 'Test Company' }).click();
  await page.getByRole('button', { name: 'Edit Company' }).click();
  await page.getByRole('textbox', { name: 'description' }).fill('Updated test company description.');
  await page.getByRole('button', { name: 'Update Company' }).click();

  // Verify the updated company details
  await expect(page.getByRole('main')).toContainText('Updated test company description.');

  // Step 6: Delete the company profile
  await page.getByRole('button', { name: 'Delete Company' }).click();
  await expect(page.locator('div').filter({ hasText: 'Confirm Company Deletion' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: 'Delete' }).click();

  // Verify the company has been deleted
  await expect(page.getByRole('link', { name: 'Test Company' })).not.toBeVisible();
});

// Step 7: User view company profiles by industry
test('User view company profiles by preferred industry', { timeout: 60000 }, async ({ page }) => {
  // Step 1: Navigate to the website
  await page.goto('https://se-frontend-pi-nine.vercel.app/');

  // Step 2: User Login
  await page.getByRole('link', { name: 'Sign-In' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('user1@gmail.com');
  await page.getByRole('textbox', { name: 'password' }).fill('12345678');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Step 3: Navigate to Company List
  await page.getByRole('link', { name: 'Company List' }).click();

  // Step 4: Filter companies by industry
  await page.getByRole('combobox', { name: 'Industry' }).selectOption('AI'); // Replace with actual option value
  await page.getByRole('button', { name: 'Filter' }).click();

  // Verify that companies in the preferred industry are displayed
  const companies = await page.locator('.company-card'); // Adjust selector as needed
  await expect(companies).toHaveCountGreaterThan(0); // Ensure at least one company is displayed
});
