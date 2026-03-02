import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login_page"; //import { test, expect } from '@playwright/test';
import { InventoryPage } from "../../pages/inventory_page";
import { loginAsStandardUser } from "../../helpers/standardUserLogin";

test("the standard user can login and does not see duplicates", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);

  await loginAsStandardUser(page); //helper function usage
  await expect(page).toHaveTitle("Swag Labs");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(inventoryPage.inventorySingleCard).toHaveCount(6);
});

test("the locked out user cannot log in - error message is displayed", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.isVisible();
  await loginPage.login("locked_out_user", "secret_sauce");
  await expect(loginPage.errorMessageOutput).toHaveText(
    "Epic sadface: Sorry, this user has been locked out.",
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
  },
);

test("the standard user tries to login without password - error message is displayed", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.isVisible();
  await loginPage.login("standard_user", "");
  await expect(loginPage.errorMessageOutput).toHaveText(
    "Epic sadface: Password is required",
  );
});

test("the standard user tries to login with incorrect password- error message is displayed", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.isVisible();
  await loginPage.login("standard_user", "incorrect_password");
  await expect(loginPage.errorMessageOutput).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("standard user tries to login with space in username - error message is displayed", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.isVisible();
  await loginPage.login(" standard_user", "secret_sauce");
  await expect(loginPage.errorMessageOutput).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});
