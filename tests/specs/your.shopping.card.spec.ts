import { test, expect } from '@playwright/test';
import { LoginPage} from '../pages/login_page'; //import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory_page';
import { ShoppingCartPage } from '../pages/shopping_cart_page';
import { Products } from '../products.strings';



test.describe('Users interactions on the inventory page', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let shoppingCart: ShoppingCartPage;

   test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    shoppingCart = new ShoppingCartPage(page);
    

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.isVisible();
    await expect(inventoryPage.inventorySingleCard).toHaveCount(6);

});


test('User is able to add the item to the shopping cart and continue shopping', async ({ page }) => {
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await inventoryPage.addItemToCart();
  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

  await inventoryPage.goToShoppingCart();
  await expect(page.getByText(Products.backpack_product)).toBeVisible();
  await expect(shoppingCart.continueShoppingButton).toBeVisible();
  await expect(page.getByText('$29.99')).toBeVisible();
  await shoppingCart.clickContinueShoppingButton();
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await inventoryPage.addItemToCart2();
  await expect(inventoryPage.shoppingCartBadge).toHaveText('2'); 
  await inventoryPage.goToShoppingCart();
  await expect(page.getByText(Products.bike_light_product)).toBeVisible();
});

test ('user is able to remove the item from the shopping cart and continue shopping', async ({ page }) => {
  await expect(page.getByText(Products.backpack_product)).toBeVisible();
  await inventoryPage.addItemToCart();
  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

  await inventoryPage.goToShoppingCart();
  await expect(page.getByText(Products.backpack_product)).toBeVisible();
  await expect(shoppingCart.continueShoppingButton).toBeVisible();
  await expect(page.getByText('$29.99')).toBeVisible();
  await shoppingCart.removeItemFromCart(Products.backpack_product);
  await expect(page.getByText(Products.backpack_product)).toBeHidden();
  await shoppingCart.clickContinueShoppingButton();
  await expect(page.getByText(Products.backpack_product)).toBeVisible();


});
});
