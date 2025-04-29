import { test, expect } from '@playwright/test';

// test.use({
//     viewport: {
//         height: 600,
//         width: 800
//     }
// });

test('test', async({ page }) => {
    await page.goto('https://se-frontend-pi-nine.vercel.app/');

    // log in as an admin
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com');
    await page.getByRole('textbox', { name: 'password' }).click();
    await page.getByRole('textbox', { name: 'password' }).fill('12345678');
    await page.locator('div').filter({ hasText: 'Remember me' }).nth(3).click();
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Welcome back, admin')).toBeVisible();

    // 1) test add company
    await page.getByRole('link', { name: 'Company List' }).click();
    await expect(page.getByRole('button', { name: 'Add New Company' })).toBeVisible();
    await page.getByRole('button', { name: 'Add New Company' }).click();
    await expect(page.getByRole('heading', { name: 'Create New Company' })).toBeVisible();

    // 1.1) fill company details
    await page.getByRole('button', { name: 'Create Company' }).click();
    await expect(page.locator('div').filter({ hasText: /^Company Name is required$/ }).nth(2)).toBeVisible();

    await page.getByRole('textbox', { name: 'Company Name' }).click();
    await page.getByRole('textbox', { name: 'Company Name' }).fill('Test Add Company');
    await page.getByRole('button', { name: 'Create Company' }).click();
    await expect(page.locator('div').filter({ hasText: /^Company Address is required$/ }).nth(2)).toBeVisible();

    await page.getByRole('textbox', { name: 'Address' }).click();
    await page.getByRole('textbox', { name: 'Address' }).fill('test address');
    await page.getByRole('textbox', { name: 'Telephone' }).click();
    await page.getByRole('textbox', { name: 'Telephone' }).fill('000-000-0000');
    await page.getByRole('button', { name: 'Create Company' }).click();
    await expect(page.locator('div').filter({ hasText: /^Company Website is required$/ }).nth(2)).toBeVisible();

    await page.getByRole('textbox', { name: 'Website' }).click();
    await page.getByRole('textbox', { name: 'Website' }).fill('https://test.com');
    await page.getByRole('button', { name: 'Create Company' }).click();
    await expect(page.locator('div').filter({ hasText: /^Company Description is required$/ }).nth(2)).toBeVisible();

    await page.getByRole('textbox', { name: 'description' }).click();
    await page.getByRole('textbox', { name: 'description' }).fill('add company');
    await page.getByRole('textbox', { name: 'Tags (comma separated)' }).click();
    await page.getByRole('textbox', { name: 'Tags (comma separated)' }).fill('test, addcompany');
    await page.getByRole('combobox', { name: 'Company Size 1-10 employees' }).click();
    await page.locator('#menu-companySize div').first().click();
    await page.getByRole('textbox', { name: 'Founded Year' }).click();
    await page.getByRole('textbox', { name: 'Founded Year' }).fill('2025');
    await page.getByRole('button', { name: 'Create Company' }).click();
    await page.goto('https://se-frontend-pi-nine.vercel.app/company');

    // 1.2) add company successfully
    await page.getByRole('button', { name: 'Refresh positions' }).click();
    await expect(page.getByRole('link', { name: 'Test Add Company test address' })).toBeVisible();
    await page.getByRole('link', { name: 'Test Add Company test address' }).getByRole('link').nth(1).click();
    await expect(page.getByText('Test Add Companytest')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Test Add Company');

    // 2) test edit company
    await expect(page.getByRole('button', { name: 'Edit Company' })).toBeVisible();
    await page.getByRole('button', { name: 'Edit Company' }).click();
    await expect(page.getByRole('heading', { name: 'Edit Company' })).toBeVisible();

    // 2.1) update company details
    await page.getByRole('textbox', { name: 'Company Name' }).click();
    await page.getByRole('textbox', { name: 'Company Name' }).fill('Test Edit Company');
    await page.getByRole('textbox', { name: 'description' }).click();
    await page.getByRole('textbox', { name: 'description' }).fill('edit company');
    await page.getByRole('textbox', { name: 'Tags (comma separated)' }).click();
    await page.getByRole('textbox', { name: 'Tags (comma separated)' }).fill('test, editcompany');
    await page.getByRole('button', { name: 'Update Company' }).click();
    await page.goto('https://se-frontend-pi-nine.vercel.app/company');


    // 2.2) update company successfully
    await page.getByRole('button', { name: 'Refresh positions' }).click();
    await expect(page.getByRole('link', { name: 'Test Edit Company test' })).toBeVisible();
    await expect(page.locator('section')).toContainText('Test Edit Company');
    await page.getByRole('link', { name: 'Test Edit Company test' }).getByRole('link').nth(1).click();
    await expect(page.getByText('Test Edit Companytest')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Test Edit Company');
    await expect(page.getByRole('main')).toContainText('edit company');
    await expect(page.getByRole('main')).toContainText('editcompany');

    // 3) test delete company
    await expect(page.getByRole('button', { name: 'Delete Company' })).toBeVisible();
    await page.getByRole('button', { name: 'Delete Company' }).click();
    await expect(page.getByRole('heading', { name: 'Confirm Company Deletion' })).toBeVisible();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.goto('https://se-frontend-pi-nine.vercel.app/company');
    // await page.getByRole('button', { name: 'Refresh positions' }).click();
    // await page.locator('section').click();
    // await expect(page.locator('section')).not.toContainText('Test Edit Company');
    
    await page.getByRole('button', { name: 'Refresh positions' }).click();


    await expect(page.locator('section')).toBeVisible();
    

    await expect(page.locator('section')).not.toContainText('Test Edit Company');
    

});

test('User can view company profiles categorized by preferred industry', async ({ page }) => {
    await page.goto('https://se-frontend-pi-nine.vercel.app/');
    
    // Sign in as a user
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('user1@gmail.com');
    await page.getByRole('textbox', { name: 'password' }).fill('12345678');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.getByRole('link', { name: 'Company List' }).click();
    
    // Verify that the 'Show tags' button is visible
    await expect(page.getByRole('button', { name: 'Show tags' })).toBeVisible();
    await page.getByRole('button', { name: 'Show tags' }).click();
    
    // Check if the preferred industry button is visible (e.g., 'AI')
    await expect(page.getByRole('button', { name: 'AI', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'AI', exact: true }).click();
    
    // Click on 'View Details' for any company
    const companyList = page.locator('a.w-full.max-w-sm');
    if (await companyList.count() > 0) {
        await companyList.first().getByRole('link', { name: 'View Details', exact: true }).click();
        await expect(page.getByText('AI', { exact: true })).toBeVisible();
    }
    
    await page.getByRole('link', { name: 'Company List' }).click();
});
