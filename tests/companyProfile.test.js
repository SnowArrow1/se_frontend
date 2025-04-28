import { test, expect } from '@playwright/test';

test.use({
    viewport: {
        height: 600,
        width: 800
    }
});

test('test', {timeout: 120_000}, async ({ page }) => {
    await page.goto('https://se-frontend-pi-nine.vercel.app/');
    
    // Log in as an admin
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com');
    await page.getByRole('textbox', { name: 'password' }).fill('12345678');
    await page.getByRole('checkbox', { name: 'Remember me' }).check();
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Welcome back, admin')).toBeVisible();

    // Add company
    await page.getByRole('link', { name: 'Company List' }).click();
    await expect(page.getByRole('button', { name: 'Add New Company' })).toBeVisible();
    await page.getByRole('button', { name: 'Add New Company' }).click();
    await expect(page.getByRole('heading', { name: 'Create New Company' })).toBeVisible();

    // Show error message for Company Name
    await page.getByRole('button', { name: 'Create Company' }).click();
    await expect(page.locator('div').filter({ hasText: /^Company Name is required$/ }).nth(2)).toBeVisible();
    
    // Fill Company Name
    await page.getByRole('textbox', { name: 'Company Name' }).fill('Test Add Company');
    await page.getByRole('button', { name: 'Create Company' }).click();
    
    // Show error message for Company Address
    await expect(page.locator('div').filter({ hasText: /^Company Address is required$/ }).nth(2)).toBeVisible();
    
    // Fill Address
    await page.getByRole('textbox', { name: 'Address' }).fill('test address');
    await page.getByRole('textbox', { name: 'Telephone' }).fill('000-000-0000');
    await page.getByRole('button', { name: 'Create Company' }).click();
    
    // Show error message for Company Website
    await expect(page.locator('div').filter({ hasText: /^Company Website is required$/ }).nth(2)).toBeVisible();
    
    // Fill Website
    await page.getByRole('textbox', { name: 'Website' }).fill('https://test.com');
    await page.getByRole('button', { name: 'Create Company' }).click();
    
    // Show error message for Company Description
    await expect(page.locator('div').filter({ hasText: /^Company Description is required$/ }).nth(2)).toBeVisible();
    
    // Fill Description and Tags
    await page.getByRole('textbox', { name: 'description' }).fill('try to add new company');
    await page.getByRole('textbox', { name: 'Tags (comma separated)' }).fill('test, addcompany');
    await page.getByRole('button', { name: 'Create Company' }).click();
    
    // Show error message for Company Size
    await expect(page.locator('div').filter({ hasText: /^Company Size is required$/ }).nth(2)).toBeVisible();
    
    // Wait for the button to be clickable before selecting Company Size
    await page.getByRole('button', { name: 'Create Company' }).waitFor({ state: 'visible', timeout: 60000 });

    // Wait for the error message to disappear before selecting Company Size
    await expect(page.locator('div').filter({ hasText: /^Company Size is required$/ }).nth(2)).toBeVisible();
    
    // Fill remaining fields to trigger validation
    await page.getByRole('combobox', { name: 'Company Size' }).click();
    await page.getByRole('option', { name: '+ employees' }).click(); 
    await page.getByRole('button', { name: 'Create Company' }).click();

    // Add company successful
    await page.waitForURL('https://se-frontend-pi-nine.vercel.app/company');

    await page.getByRole('button', { name: 'Refresh positions' }).click();
    await expect(page.getByRole('link', { name: 'Test Add Company test address' })).toBeVisible();
    await page.getByRole('link', { name: 'Test Add Company test address' }).getByRole('link').nth(1).click();
    await expect(page.getByText('Test Add Companytest')).toBeVisible();

    // Edit company
    await expect(page.getByRole('button', { name: 'Edit Company' })).toBeVisible();
    await page.getByRole('button', { name: 'Edit Company' }).click();
    await expect(page.getByRole('heading', { name: 'Edit Company' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Company Name' }).fill('Test Edit Company');
    await page.getByRole('textbox', { name: 'Address' }).fill('test edit address');
    await page.getByRole('textbox', { name: 'description' }).fill('try to edit company');
    await page.getByRole('textbox', { name: 'Tags (comma separated)' }).fill('test, editcompany');
    await page.getByRole('button', { name: 'Update Company' }).click();

    // Edit company successful
    await page.waitForURL('https://se-frontend-pi-nine.vercel.app/company');

    await page.getByRole('button', { name: 'Refresh positions' }).click();
    await expect(page.getByRole('link', { name: 'Test Edit Company test edit' })).toBeVisible();
    await page.getByRole('link', { name: 'Test Edit Company test edit' }).getByRole('link').nth(1).click();
    await expect(page.getByText('Test Edit Companytest edit')).toBeVisible();
});
