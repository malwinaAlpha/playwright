import { test, expect } from '@playwright/test';
import { LoginPage} from '../pages/login_page'; //import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory_page';
import { ShoppingCartPage } from '../pages/shopping_cart_page';
import { CheckOutPage } from '../pages/check_out_page';
import { Products } from '../products.strings';


test.describe('User interactions on the checkout page', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let shoppingCart: ShoppingCartPage;
  let checkOutPage: CheckOutPage;

   test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    shoppingCart = new ShoppingCartPage(page);
    checkOutPage = new CheckOutPage(page);
    

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.isVisible();
    await expect(inventoryPage.inventorySingleCard).toHaveCount(6);

});


test('the user can complete the checkout process successfully', async ({ page }) => {
  await expect(page.getByText(Products.backpack_product)).toBeVisible();
  await inventoryPage.addItemToCart();
  await expect(page.getByText(Products.bike_light_product)).toBeVisible();
  await inventoryPage.addItemToCart2();
  await expect(inventoryPage.shoppingCartBadge).toHaveText('2');
  await inventoryPage.goToShoppingCart();
  await shoppingCart.clickCheckoutButton();
  await expect(checkOutPage.firstNameField).toBeVisible();
  await checkOutPage.firstNameField.fill('Malwina');
  await expect(checkOutPage.lastNameField).toBeVisible();
  await checkOutPage.lastNameField.fill('Kowalczyk');
  await expect(checkOutPage.zipPostalCodeField).toBeVisible();
  await checkOutPage.zipPostalCodeField.fill('00-000');
  await checkOutPage.continueButton.click();
  await expect(page.getByText(Products.check_out_overview)).toBeVisible();
  await expect(page.getByText(Products.backpack_product)).toBeVisible();
  await expect(page.getByText(Products.bike_light_product)).toBeVisible();
  await checkOutPage.clickFinishButton();
  await checkOutPage.getCheckoutCompleteHeader();
  await checkOutPage.clickBackHomeButton();
});


test('Error message when user submits with missing fields', async ({ page }) => {
  await expect(page.getByText(Products.backpack_product)).toBeVisible();
  await inventoryPage.addItemToCart();
  await expect(page.getByText(Products.bike_light_product)).toBeVisible();
  await inventoryPage.addItemToCart2();
  await expect(inventoryPage.shoppingCartBadge).toHaveText('2');
  await inventoryPage.goToShoppingCart();
  await shoppingCart.clickCheckoutButton();
  await expect(checkOutPage.firstNameField).toBeVisible();
  await checkOutPage.firstNameField.fill('Malwina');
  await checkOutPage.continueButton.click();
  await expect(page.getByText('Error: Last Name is required')).toBeVisible();
  await checkOutPage.lastNameField.fill('Kowalczyk');
  await checkOutPage.continueButton.click();
  await expect(page.getByText('Error: Postal Code is required')).toBeVisible();
  

  });
    });