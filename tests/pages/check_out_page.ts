import { Locator, Page, expect} from '@playwright/test';

export class CheckOutPage {
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly zipPostalCodeField: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;
    readonly backHomeButton: Locator;
 
    constructor (page: Page) {
        this.page = page;
        this.firstNameField = page.locator('#first-name');
        this.lastNameField = page.locator('#last-name');
        this.zipPostalCodeField = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('#cancel');
        this.finishButton = page.locator('#finish');
        this.backHomeButton = page.locator('#back-to-products');

    }

    async fillFirstName(string){
        await this.firstNameField.fill(string);
    }
    async fillLastName(string){
        await this.lastNameField.fill(string);
    }
    async fillZipPostalCode(string){
        await this.zipPostalCodeField.fill(string);
    }
    async clickContinueButton(){
        await this.continueButton.click();
    }
    async clickCancelButton(){
        await this.cancelButton.click();
    }
    async clickFinishButton(){
        await this.finishButton.click();
    }
    async getCheckoutCompleteHeader(){
        return this.page.getByText('Checkout: Complete!'); 
    }

    async clickBackHomeButton(){
        await this.backHomeButton.click();
    }

    async lastNameErrorMessage() {
        return this.page.getByText('Error: Last Name is required'); 
    }




} 
