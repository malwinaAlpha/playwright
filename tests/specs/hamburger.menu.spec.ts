import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login_page"; //import { test, expect } from '@playwright/test';
import { InventoryPage } from "../../pages/inventory_page";

import { HamburgerMenuPage } from "../../pages/hamburger_menu";
import { Products } from "../products.strings";
import { loginAsStandardUser } from "../../helpers/standardUserLogin";
import { ShoppingCartPage } from "../../pages/shopping_cart_page";

test.describe("Users interactions with the menu", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let shoppingCart: ShoppingCartPage;
  let hamburgerMenuPage: HamburgerMenuPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    shoppingCart = new ShoppingCartPage(page);
    hamburgerMenuPage = new HamburgerMenuPage(page);

    await loginAsStandardUser(page);
    await expect(inventoryPage.inventorySingleCard).toHaveCount(6);
  });

  test("the user can reset app state", async ({ page }) => {
    await expect(page.getByText(Products.backpack_product)).toBeVisible();
    await inventoryPage.addItemToCart();
    await expect(page.getByText(Products.bike_light_product)).toBeVisible();
    await inventoryPage.addItemToCart2();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("2");

    await hamburgerMenuPage.openHamburgerMenu();
    await hamburgerMenuPage.resetAppState();
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });

  test("the user can logout", async ({ page }) => {
    await hamburgerMenuPage.openHamburgerMenu();
    await hamburgerMenuPage.clickLogout();
    await loginPage.isVisible();
  });

  test("the user can go to about page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const hamburgerMenuPage = new HamburgerMenuPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.isVisible();

    await hamburgerMenuPage.openHamburgerMenu();
    await hamburgerMenuPage.clickAbout();
    await expect(page).toHaveURL("https://saucelabs.com/");
  });
});
