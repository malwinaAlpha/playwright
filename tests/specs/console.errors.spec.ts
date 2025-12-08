import { test, expect } from "@playwright/test";
import { InventoryPage } from "../../pages/inventory_page";
import { ShoppingCartPage } from "../../pages/shopping_cart_page";
import { CheckOutPage } from "../../pages/check_out_page";
import { fillCheckoutForm } from "../../helpers/fillCheckoutForm";
import { loginAsErrorUser } from "../../helpers/errorUserLogin";

test("Console should not have errors on checkout page", async ({ page }) => {
  const consoleErrors: string[] = [];

  // Listen for console errors
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  // Navigate to the checkout page
  const inventoryPage = new InventoryPage(page);
  const shoppingCart = new ShoppingCartPage(page);
  const checkOutPage = new CheckOutPage(page);

  await loginAsErrorUser(page);
  await inventoryPage.addItemToCart();
  await inventoryPage.goToShoppingCart();
  await shoppingCart.checkoutButton.click();
  await fillCheckoutForm(page, "Malwina", "Kowalczyk", "00-001");
  await checkOutPage.clickFinishButton();

  // Assert that there are no console errors
  expect(consoleErrors).toEqual([]);
});
