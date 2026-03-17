import { LoginPage } from "../pages/login_page";
import { Page } from "playwright/test";
import { Credentials } from "../data/credentials";

export async function loginAsPerformenceUser(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.isVisible();
  await loginPage.login(Credentials.performanceGlitchUser.username, Credentials.performanceGlitchUser.password);
}
