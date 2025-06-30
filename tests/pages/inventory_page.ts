import {Page, Locator } from '@playwright/test'; 
//Product list, filters, etc.


export class InventoryPage{ // pongo todo lo que contiene la pagina de inventario
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly addToCartButton2: Locator;
    readonly addToCartButton3: Locator;
    readonly addToCartButton4: Locator;
    readonly addToCartButton5: Locator;
    readonly addToCartButton6: Locator;
    readonly shoppingCart: Locator;
    readonly shoppingCartBadge: Locator;
    readonly inventorySingleCard: Locator;
    readonly removeButton: Locator;
    readonly removebuttonBikeLight: Locator;
    readonly removebuttonBoltTshirt: Locator;
    readonly sortDropdown: Locator;
    readonly productNames: Locator;
    readonly activeSortOption: Locator;
    readonly sortOptions: Locator;
    readonly productImages: Locator;
    readonly productPrices: Locator;

   
    constructor(page: Page ) { // incializo la pagina con los identificadores de los elementos
        this.page = page;
        this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
        this.addToCartButton2 = page.locator('#add-to-cart-sauce-labs-bike-light');
        this.addToCartButton3 = page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
        this.addToCartButton4 = page.locator('#add-to-cart-sauce-labs-fleece-jacket');
        this.addToCartButton5 = page.locator('#add-to-cart-sauce-labs-onesie');
        this.addToCartButton6 = page.locator('#add-to-cart-test.allthethings()-t-shirt-(red)');
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.inventorySingleCard = page.locator('.inventory_item');
        this.removeButton = page.locator('#remove-sauce-labs-backpack');
        this.removebuttonBikeLight = page.locator('#remove-sauce-labs-bike-light');
        this.removebuttonBoltTshirt = page.locator('#remove-sauce-labs-bolt-t-shirt');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]'); // sort <select> dropdown
        this.productNames = page.locator('.inventory_item_name');// all product name elements
        this.activeSortOption = page.locator('.active_option');
        this.sortOptions = page.locator('[data-test="product_sort_container"] option'); // all <option> elements
        this.productImages = page.locator('.inventory_item_img');
        this.productPrices = page.locator('.inventory_item_price'); // all product price elements

    }


    async addItemToCart(){ 
        await this.addToCartButton.waitFor({ state: 'visible' }); 
        await this.addToCartButton.click();
    }

    async addItemToCart2(){ 
        await this.addToCartButton2.waitFor({ state: 'visible' }); 
        await this.addToCartButton2.click();
    }
    async addItemToCart3(){ 
        await this.addToCartButton3.waitFor({ state: 'visible' }); 
        await this.addToCartButton3.click();
    }
    async addItemToCart4(){
        await this.addToCartButton4.waitFor({ state: 'visible' });
        await this.addToCartButton4.click();
    }
    async addItemToCart5(){
        await this.addToCartButton5.waitFor({ state: 'visible' });
        await this.addToCartButton5.click();
    }
    async addItemToCart6(){
        await this.addToCartButton6.waitFor({ state: 'visible' });
        await this.addToCartButton6.click();
    }
    
    async goToShoppingCart(){
        await this.shoppingCart.waitFor({ state: 'visible' });
        await this.shoppingCart.click();
    }

    async removeItemFromCart(itemName: string){
        await this.removeButton.waitFor({ state: 'visible' });
        await this.removeButton.click();
    }

    async removeBikeFromCart(itemName: string){
        await this.removebuttonBikeLight.waitFor({ state: 'visible' });     
        await this.removebuttonBikeLight.click();
    }

    async removeBoltTshirtFromCart(itemName: string){ //porque aqui se pone el string?
        await this.removebuttonBoltTshirt.waitFor({ state: 'visible' });
        await this.removebuttonBoltTshirt.click();
    }   

    async openSortDropdown() {
        await this.sortDropdown.waitFor({ state: 'visible' });
        await this.sortDropdown.click();
    }

    async selectSortOption(option: 'az' | 'za' | 'lohi' | 'hilo') {
  const labelMap = {
    az: 'Name (A to Z)',
    za: 'Name (Z to A)',
    lohi: 'Price (low to high)',
    hilo: 'Price (high to low)',
  };

  await this.sortDropdown.selectOption({ label: labelMap[option] });
}


    async verifyNoDuplicateImages() {
        const srcList = await this.productImages.evaluateAll(images => 
            images.map(img => (img as HTMLImageElement).src)
        );

        const unique = new Set(srcList);
  if (unique.size !== srcList.length) {
    throw new Error('Duplicate image sources found on the inventory page.');
  }

    
}}
