class CartPage {
    elements = {
        cartItems: () => cy.get('.cart_item'),
        cartItemNames: () => cy.get('.inventory_item_name'),
        cartItemPrices: () => cy.get('.inventory_item_price'),
        checkoutButton: () => cy.get('[data-test="checkout"]'),
        continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
        removeButtons: () => cy.get('[data-test^="remove"]'),
        firstNameInput: () => cy.get('[data-test="firstName"]'),
        lastNameInput: () => cy.get('[data-test="lastName"]'),
        postalCodeInput: () => cy.get('[data-test="postalCode"]'),
        continueButton: () => cy.get('[data-test="continue"]'),
        finishButton: () => cy.get('[data-test="finish"]'),
        subtotal: () => cy.get('.summary_subtotal_label'),
        tax: () => cy.get('.summary_tax_label'),
        total: () => cy.get('.summary_total_label'),
        completeHeader: () => cy.get('.complete-header'),
        completeText: () => cy.get('.complete-text')
    };

    isLoaded() {
        cy.url().should('include', '/cart.html');
        this.elements.checkoutButton()
            .should('be.visible');
        this.elements.continueShoppingButton()
            .should('be.visible');
        return this;
    }

    getCartItemCount() {
        return this.elements.cartItems()
            .its('length');
    }

    getCartItemByIndex(index) {
        return this.elements.cartItems()
            .eq(index);
    }

    getCartItemNameByIndex(index) {
        return this.elements.cartItemNames()
            .eq(index)
            .invoke('text');
    }

    getCartItemPriceByIndex(index) {
        return this.elements.cartItemPrices()
            .eq(index)
            .invoke('text');
    }

    clickCheckout() {
        this.elements.checkoutButton()
            .click();
        return this;
    }

    clickContinueShopping() {
        this.elements.continueShoppingButton()
            .click();
        return this;
    }

    removeItemByIndex(index) {
        this.elements.removeButtons()
            .eq(index)
            .click();
        return this;
    }

    verifyProductsInCart(expectedProducts) {
        this.elements.cartItemNames().each(($el, index) => {
            const itemName = $el.text();
            expect(expectedProducts).to.include(itemName);
        });
        return this;
    }

    fillCheckoutInfo(firstName, lastName, postalCode) {
        this.elements.firstNameInput()
            .type(firstName);
        this.elements.lastNameInput()
            .type(lastName);
        this.elements.postalCodeInput()
            .type(postalCode);
        return this;
    }

    clickContinue() {
        this.elements.continueButton()
            .click();
        return this;
    }

    clickFinish() {
        this.elements.finishButton()
            .click();
        return this;
    }

    isCheckoutStepTwoLoaded() {
        cy.url().should('include', '/checkout-step-two.html');
        this.elements.finishButton()
            .should('be.visible');
        this.elements.subtotal()
            .should('be.visible');
        this.elements.tax()
            .should('be.visible');
        this.elements.total()
            .should('be.visible');
        return this;
    }

    isOrderCompletePageLoaded() {
        cy.url().should('include', '/checkout-complete.html');
        this.elements.completeHeader()
            .should('be.visible');
        this.elements.completeText()
            .should('be.visible');
        return this;
    }

    getSubtotal() {
        return this.elements.subtotal()
            .invoke('text');
    }

    getTax() {
        return this.elements.tax()
            .invoke('text');
    }

    getTotal() {
        return this.elements.total()
            .invoke('text');
    }

    getOrderCompleteMessage() {
        return this.elements.completeHeader();
    }
}

export default CartPage;