import { Locator, Page } from '@playwright/test';

export class HamburgerMenuPage {
    readonly page: Page;
    readonly hamburgerMenu: Locator;
    readonly aboutButton: Locator;
    readonly logoutButton: Locator;
    readonly resetAppStateButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.hamburgerMenu = page.locator('#react-burger-menu-btn');
        this.aboutButton = page.locator('#about_sidebar_link');
        this.logoutButton = page.locator('#logout_sidebar_link');
        this.resetAppStateButton = page.locator('#reset_sidebar_link');

    }


async openHamburgerMenu(){
    await this.hamburgerMenu.click(); 
}

async clickAbout(){
    await this.aboutButton.click();;
}

async clickLogout(){
    await this.logoutButton.click();
}

async resetAppState(){
    await this.resetAppStateButton.click();
}

}