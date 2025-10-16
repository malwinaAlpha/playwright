import { expect, Page, Locator } from "@playwright/test"; //import { test, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly errorMesaageOutput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator("#login-button");
    this.errorMesaageOutput = page.locator(".error-message-container");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async isVisible() {
    //await this.page.waitForURL('https://www.saucedemo.com/');
    await this.page.getByText("Username").isVisible();
    await this.page.getByText("Password").isVisible();
    await this.page.getByRole("button", { name: "Login" }).isVisible();
  }

  async login(username: string, password: string) {
    await this.page.getByRole("textbox", { name: "Username" }).fill(username);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async loginLockedOutUser(username: string, password: string) {
    await this.page.getByRole("textbox", { name: "Username" }).fill(username);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }
}
