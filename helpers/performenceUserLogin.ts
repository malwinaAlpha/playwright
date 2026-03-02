import { LoginPage } from "../pages/login_page";
import { Page } from "playwright/test";

export async function loginAsPerformenceUser(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.isVisible();
  await loginPage.login("performance_glitch_user", "secret_sauce");
}
