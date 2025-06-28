import { Locator, Page, expect} from '@playwright/test';

export class ShoppingCartPage {
    readonly page: Page;
    readonly removeButton: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
 
    constructor (page: Page) {
        this.page = page;
        this.removeButton = page.locator('#remove-sauce-labs-backpack');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
    }


    async removeItemFromCart(itemName: string){
        await this.removeButton.click();
        //await this.page.getByText(itemName).locator('#remove-sauce-labs-backpack').getByRole('button', { name: 'Remove' }).click();
    }
    async verifyItemRemoved(itemName: string) {
        await expect(this.page.locator(`.cart_item:has-text("${itemName}")`)).toHaveCount(0);//add here notsure hot to do it
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
    async clickContinueShoppingButton() {
        await this.continueShoppingButton.click();
    }

} 
