import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page'; //import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory_page';




test('the user can login and does not see duplicates', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page); 

  await loginPage.goto();
  await loginPage.isVisible();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveTitle('Swag Labs');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('the locked out user tries to login', async ({ page }) => {
  const loginPage = new LoginPage(page); 

  await loginPage.goto();
  await loginPage.isVisible();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(loginPage.errorMesaageOutput).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

test('the problem user sees incorrect, duplicated product images on the inventory page', async ({ page }) => {
  const loginPage = new LoginPage(page); 
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.isVisible();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await inventoryPage.verifyNoDuplicateImages();
});


