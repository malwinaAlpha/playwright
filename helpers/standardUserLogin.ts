import { LoginPage } from "../pages/login_page";
import { Page } from "playwright/test";

export async function loginAsStandardUser(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.isVisible();
  await loginPage.login("standard_user", "secret_sauce");
}
