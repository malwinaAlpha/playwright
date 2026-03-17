import { test, expect } from "@playwright/test";
import { loginAsStandardUser } from "../../helpers/standardUserLogin";
import { loginAsPerformenceUser } from "../../helpers/performenceUserLogin";
import { InventoryPage } from "../../pages/inventory_page";
import { ShoppingCartPage } from "../../pages/shopping_cart_page";

test("Standard user login page loads within 2 seconds - page load time", async ({
  page,
}) => {
  const startTime = Date.now();
  await page.goto("https://www.saucedemo.com/"); // Only measure page load
  const loadTime = Date.now() - startTime;

  console.log(`Page loaded in ${loadTime}ms`);
  expect(loadTime).toBeLessThan(2000);
});

test("Standard user login flow completes within 2 seconds", async ({
  page,
}) => {
  const startTime = Date.now();
  await loginAsStandardUser(page); // Measures page load + login actions
  const loadTime = Date.now() - startTime;

  console.log(`Login flow completed in ${loadTime}ms`);
  expect(loadTime).toBeLessThan(2000);
});

// performence user - takes too long to login, test should fail
test.fail("Performence user login within 2 seconds", async ({ page }) => {
  const startTime = Date.now();
  await loginAsPerformenceUser(page); // Measures page load + login actions
  const loadTime = Date.now() - startTime;

  console.log(`Login flow completed in ${loadTime}ms`);
  expect(loadTime).toBeLessThan(2000);
});

// performence user - adds a product and wants to continue shopping, takes too long

test.fail(
  "Performence user is taken from Your Cart to inventory page within 2 seconds",
  async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const shoppingCart = new ShoppingCartPage(page);
    await loginAsPerformenceUser(page);
    await expect(page.getByAltText("Sauce Labs Backpack")).toBeVisible();
    await inventoryPage.addItemToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");

    await inventoryPage.goToShoppingCart();
    await expect(page.getByText("Your Cart")).toBeVisible();
    const startTime = Date.now();
    await shoppingCart.clickContinueShoppingButton();
    const loadTime = Date.now() - startTime;

    console.log(`Navigation to inventory page completed in ${loadTime}ms`);
    expect(loadTime).toBeLessThan(2000);
  },
);
