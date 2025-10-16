import { Locator, Page, expect } from "@playwright/test";

export class CheckOutPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly zipPostalCodeField: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly backHomeButton: Locator;
  readonly itemPrice: Locator;
  //readonly itemTotal: Locator;
  readonly taxTotal: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.locator("#first-name");
    this.lastNameField = page.locator("#last-name");
    this.zipPostalCodeField = page.locator("#postal-code");
    this.continueButton = page.locator("#continue");
    this.cancelButton = page.locator("#cancel");
    this.finishButton = page.locator("#finish");
    this.backHomeButton = page.locator("#back-to-products");
    this.itemPrice = page.locator(".inventory_item_price"); // individual price of each item
    //this.itemTotal = page.locator('.summary_subtotal_label');// sum of items no tax included
    this.taxTotal = page.locator(".summary_tax_label"); // the tax
    this.totalPrice = page.locator(".summary_total_label"); // total price including tax
  }

  async fillFirstName(firstName: string) {
    await this.firstNameField.fill(firstName);
  }
  async fillLastName(lastName: string) {
    await this.lastNameField.fill(lastName);
  }
  async fillZipPostalCode(zipPostalCode: string) {
    await this.zipPostalCodeField.fill(zipPostalCode);
  }
  async clickContinueButton() {
    await this.continueButton.click();
  }
  async clickCancelButton() {
    await this.cancelButton.click();
  }
  async clickFinishButton() {
    await this.finishButton.click();
  }
  async getCheckoutCompleteHeader() {
    await expect(this.page.locator(".complete-header")).toHaveText(
      "Thank you for your order!"
    );
  }

  async clickBackHomeButton() {
    await this.backHomeButton.click();
  }

  async lastNameErrorMessage() {
    return this.page.getByText("Error: Last Name is required");
  }
}
