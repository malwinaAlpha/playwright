import { CheckOutPage } from "../pages/check_out_page";
import { Page } from "playwright/test";

export async function fillCheckoutForm(
  page: Page,
  firstName: string,
  lastName: string,
  postalCode: string
) {
  const checkOutPage = new CheckOutPage(page);
  await checkOutPage.fillFirstName(firstName);
  await checkOutPage.fillLastName(lastName);
  await checkOutPage.fillZipPostalCode(postalCode);
  await checkOutPage.continueButton.click();
}
