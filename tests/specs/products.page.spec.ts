import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login_page"; //import { test, expect } from '@playwright/test';
import { InventoryPage } from "../../pages/inventory_page";
import { ShoppingCartPage } from "../../pages/shopping_cart_page";

import { loginAsStandardUser } from "../../helpers/standardUserLogin";
import { Products } from "../products.strings";

test.describe("Item selection and cart management", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let shoppingCart: ShoppingCartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    shoppingCart = new ShoppingCartPage(page);

    await loginAsStandardUser(page);
    await expect(inventoryPage.inventorySingleCard).toHaveCount(6);
  });

  test("User is able to select an item", async ({ page }) => {
    await expect(page.getByText(Products.backpack_product)).toBeVisible();
    await inventoryPage.addItemToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");

    await inventoryPage.goToShoppingCart();
    await expect(page.getByText(Products.backpack_product)).toBeVisible();
    await expect(shoppingCart.continueShoppingButton).toBeVisible();
    await expect(page.getByText("$29.99")).toBeVisible();

    await inventoryPage.removeItemFromCart(Products.backpack_product);
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });

  test("User is able to select multiple items", async ({ page }) => {
    await expect(page.getByText(Products.backpack_product)).toBeVisible();
    await inventoryPage.addItemToCart();
    await expect(page.getByText(Products.bike_light_product)).toBeVisible();
    await inventoryPage.addItemToCart2();
    //await expect(page.getByText('Sauce Bolt T-Shirt')).toBeVisible();
    await inventoryPage.addItemToCart3();
    await expect(page.getByText(Products.jacket_product)).toBeVisible();
    await inventoryPage.addItemToCart4();
    await expect(page.getByText(Products.onesie_product)).toBeVisible();
    await inventoryPage.addItemToCart5();
  });

  test("User is able to select multiple items and remove them 3 of them", async ({
    page,
  }) => {
    await expect(page.getByText(Products.backpack_product)).toBeVisible();
    await inventoryPage.addItemToCart();
    await expect(page.getByText(Products.bike_light_product)).toBeVisible();
    await inventoryPage.addItemToCart2();
    //await expect(page.getByText('Sauce Bolt T-Shirt')).toBeVisible();
    await inventoryPage.addItemToCart3();
    await expect(page.getByText(Products.jacket_product)).toBeVisible();
    await inventoryPage.addItemToCart4();
    await expect(page.getByText(Products.onesie_product)).toBeVisible();
    await inventoryPage.addItemToCart5();

    await inventoryPage.removeButton.click();
    await inventoryPage.removeBikeFromCart("Sauce Bike Light");
    await inventoryPage.removeBoltTshirtFromCart("Sauce Bolt T-Shirt");
    await expect(inventoryPage.shoppingCartBadge).toHaveText("2");
  });

  test("User is able to filter items: price, name", async ({ page }) => {
    await inventoryPage.openSortDropdown();
    //sort by name A-Z
    await inventoryPage.selectSortOption("az");
    const itemNames = await inventoryPage.productNames.allTextContents();
    const sortedNames = [...itemNames].sort((a, b) => a.localeCompare(b));
    expect(itemNames).toEqual(sortedNames);
    //sort by name Z-A
    await inventoryPage.selectSortOption("za");
    const itemNamesZA = await inventoryPage.productNames.allTextContents();
    const sortedNamesZA = [...itemNames].sort((a, b) => b.localeCompare(a));
    expect(itemNamesZA).toEqual(sortedNamesZA);
    //sort by price low to high
    await inventoryPage.selectSortOption("lohi");
    const itemPrices = await inventoryPage.productPrices.allTextContents();
    const numericPriceLohi = itemPrices.map((price) =>
      parseFloat(price.replace("$", ""))
    );
    const sortedPricesLohi = [...numericPriceLohi].sort((a, b) => a - b); // asserting that they are sorted low to high
    expect(numericPriceLohi).toEqual(sortedPricesLohi);
    //sort by price high to low
    await inventoryPage.selectSortOption("hilo");
    const itemPricesHilo = await inventoryPage.productPrices.allTextContents();
    const numericPriceHilo = itemPricesHilo.map((price) =>
      parseFloat(price.replace("$", ""))
    );
    const sortedPricesHilo = [...numericPriceHilo].sort((a, b) => b - a); // asserting that they are sorted high to low
    expect(numericPriceHilo).toEqual(sortedPricesHilo);
  });
});

test("the error user cannot remove item from the product page", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.isVisible();
  await loginPage.login("error_user", "secret_sauce");
  await expect(page).toHaveTitle("Swag Labs");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(inventoryPage.inventorySingleCard).toHaveCount(6);
  await expect(inventoryPage.removeButton).toBeHidden();
  await expect(inventoryPage.addToCartButton).toBeVisible();
  await inventoryPage.addItemToCart();
  await expect(inventoryPage.removeButton).toBeVisible();
  await inventoryPage.removeButton.click();
  await expect(inventoryPage.removeButton).toBeVisible();
  await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
});
