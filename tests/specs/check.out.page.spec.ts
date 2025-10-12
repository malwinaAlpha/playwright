import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login_page";
import { InventoryPage } from "../../pages/inventory_page";
import { ShoppingCartPage } from "../../pages/shopping_cart_page";
import { CheckOutPage } from "../../pages/check_out_page";
import { Products } from "../products.strings";
import { expectCartCount } from "../../helpers/cartAssertions";
import { loginAsStandardUser } from "../../helpers/standardUserLogin";
import { fillCheckoutForm } from "../../helpers/fillCheckoutForm";

test.describe("User interactions on the checkout page", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let shoppingCart: ShoppingCartPage;
  let checkOutPage: CheckOutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    shoppingCart = new ShoppingCartPage(page);
    checkOutPage = new CheckOutPage(page);

    await loginAsStandardUser(page);
    await expect(inventoryPage.inventorySingleCard).toHaveCount(6);
  });

  test("the user can complete the checkout process successfully", async ({
    page,
  }) => {
    await expect(page.getByText(Products.backpack_product)).toBeVisible();
    await inventoryPage.addItemToCart();
    await expect(page.getByText(Products.bike_light_product)).toBeVisible();
    await inventoryPage.addItemToCart2();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("2");
    await inventoryPage.goToShoppingCart();
    await shoppingCart.clickCheckoutButton();
    await fillCheckoutForm(page, "Malwina", "Kowalczyk", "00-000");
    await expect(page.getByText(Products.check_out_overview)).toBeVisible();
    await expect(page.getByText(Products.backpack_product)).toBeVisible();
    await expect(page.getByText(Products.bike_light_product)).toBeVisible();
    await checkOutPage.clickFinishButton();
    await checkOutPage.getCheckoutCompleteHeader();
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
    await checkOutPage.clickBackHomeButton();
  });

  test("user can see the correct total price in the checkout overview", async ({
    page,
  }) => {
    await expect(page.getByText(Products.backpack_product)).toBeVisible();
    await inventoryPage.addItemToCart();
    await expect(page.getByText(Products.bike_light_product)).toBeVisible();
    await inventoryPage.addItemToCart2();
    await expect(page.getByText(Products.onesie_product)).toBeVisible();
    await inventoryPage.addItemToCart5();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("3");
    await inventoryPage.goToShoppingCart();
    await shoppingCart.clickCheckoutButton();
    await fillCheckoutForm(page, "Malwina", "Kowalczyk", "00-000");
    await expect(page.getByText(Products.check_out_overview)).toBeVisible();
    await expect(page.getByText(Products.backpack_product)).toBeVisible();
    await expect(page.getByText(Products.bike_light_product)).toBeVisible();
    await expect(page.getByText(Products.onesie_product)).toBeVisible();
    // await expect(checkOutPage.itemPrice).toBeVisible(); //--- error: Locator 'itemPrice' is not defined in CheckOutPage class

    //extract item price
    const itemPrices = await checkOutPage.itemPrice.allTextContents(); //IT GIVES ME AN ARRAY OF STRINGS ['$29.99', '$9.99']
    const numericPrices = itemPrices.map((price) =>
      parseFloat(price.replace("$", ""))
    ); //IT GIVES ME AN ARRAY OF NUMBERS  WITHOUT $ [29.99, 9.99]
    const expectedItemTotal = numericPrices.reduce((acc, val) => acc + val, 0); // it sums all the numbers in the array numericPrices

    // extract tax
    const taxText = await checkOutPage.taxTotal.textContent();
    const tax = parseFloat((taxText ?? "").replace("Tax: $", "")); // it removes the 'Tax: $' and converts to number

    // calculate expected total
    const expectedTotal = expectedItemTotal + tax; // it sums the expected item total and tax

    // check the total price
    const itemTotalPrice = await checkOutPage.totalPrice.textContent();
    const itemTotalNumber = parseFloat(
      (itemTotalPrice ?? "").replace("Total: $", "")
    ); //if itemTotalPrice is null, it becomes an empty string '', which won't crash the test
    expect(itemTotalNumber).toBeCloseTo(expectedTotal, 2);
  });

  test("Error message when user submits with missing fields", async ({
    page,
  }) => {
    await expect(page.getByText(Products.backpack_product)).toBeVisible();
    await inventoryPage.addItemToCart();
    await expect(page.getByText(Products.bike_light_product)).toBeVisible();
    await inventoryPage.addItemToCart2();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("2");
    await inventoryPage.goToShoppingCart();
    await shoppingCart.clickCheckoutButton();
    await expect(checkOutPage.firstNameField).toBeVisible();
    await checkOutPage.firstNameField.fill("Malwina");
    await checkOutPage.continueButton.click();
    await expect(page.getByText("Error: Last Name is required")).toBeVisible();
    await checkOutPage.lastNameField.fill("Kowalczyk");
    await checkOutPage.continueButton.click();
    await expect(
      page.getByText("Error: Postal Code is required")
    ).toBeVisible();
  });

  test("User can navigate between inventory, cart, and checkout without losing cart state", async ({
    page,
  }) => {
    await expect(page.getByText(Products.backpack_product)).toBeVisible();
    await inventoryPage.addItemToCart();

    await expect(page.getByText(Products.bike_light_product)).toBeVisible();
    await inventoryPage.addItemToCart2();

    await expect(page.getByText(Products.onesie_product)).toBeVisible();
    await inventoryPage.addItemToCart5();

    await expectCartCount(inventoryPage, "3");

    await inventoryPage.goToShoppingCart();
    await shoppingCart.clickContinueShoppingButton();
    await expectCartCount(inventoryPage, "3");

    await inventoryPage.goToShoppingCart();
    await shoppingCart.clickCheckoutButton();
    await expect(checkOutPage.firstNameField).toBeVisible();
    await expectCartCount(inventoryPage, "3");

    await checkOutPage.clickCancelButton();
    await expectCartCount(inventoryPage, "3");
  });
});
