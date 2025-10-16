import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login_page"; //import { test, expect } from '@playwright/test';
import { InventoryPage } from "../../pages/inventory_page";
import { loginAsStandardUser } from "../../helpers/standardUserLogin";

test("the user can login and does not see duplicates", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await loginAsStandardUser(page); //helper function usage
  await expect(page).toHaveTitle("Swag Labs");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test("the locked out user cannot log in - error message is displayed", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.isVisible();
  await loginPage.login("locked_out_user", "secret_sauce");
  await expect(loginPage.errorMesaageOutput).toHaveText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test.fail(
  "the problem user sees incorrect, duplicated product images on the inventory page",
  async ({
    //Run this test, but expect it to fail.
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.isVisible();
    await loginPage.login("problem_user", "secret_sauce");
    await inventoryPage.verifyNoDuplicateImages();
  }
);

//write a test: performence user con login
