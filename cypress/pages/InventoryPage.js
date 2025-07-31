class InventoryPage {
    elements = {
        productList: () => cy.get('.inventory_item'),
        addToCartButtons: () => cy.get('[data-test^="add-to-cart"]'),
        shoppingCartBadge: () => cy.get('.shopping_cart_badge'),
        shoppingCartLink: () => cy.get('.shopping_cart_link'),
        productNames: () => cy.get('.inventory_item_name'),
        productPrices: () => cy.get('.inventory_item_price')
    };

    isLoaded() {
        cy.url().should('include', '/inventory.html');
        this.elements.productList()
            .should('be.visible');
        this.elements.addToCartButtons()
            .should('be.visible');
        return this;
    }

    getProductByIndex(index) {
        return this.elements.productList()
            .eq(index);
    }

    addProductToCartByIndex(index) {
        this.getProductByIndex(index)
            .find('[data-test^="add-to-cart"]')
            .click();
        return this;
    }

    getProductNameByIndex(index) {
        return this.elements.productNames()
            .eq(index)
            .invoke('text');
    }

    getProductPriceByIndex(index) {
        return this.elements.productPrices()
            .eq(index)
            .invoke('text');
    }

    getCartBadgeCount() {
        return this.elements.shoppingCartBadge();
    }

    clickOnShoppingCart() {
        this.elements.shoppingCartLink()
            .click();
        return this;
    }

    addTwoDistinctProductsToCart(firstIndex, secondIndex) {
        this.addProductToCartByIndex(firstIndex);
        this.addProductToCartByIndex(secondIndex);
        return this;
    }
}

export default InventoryPage;