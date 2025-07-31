import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import TestData from '../utils/TestData';

describe('Testes do Carrinho de Compras', () => {
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();
    const cartPage = new CartPage();

    beforeEach(() => {
        loginPage.visit();
        loginPage.login(TestData.users.standard.username, TestData.users.standard.password);

        inventoryPage.isLoaded();
    });

    it('Deve exibir o número 2 no ícone do carrinho ao adicionar dois produtos distintos', () => {
        inventoryPage.addProductToCartByIndex(TestData.productIndices.first);
        inventoryPage.getCartBadgeCount()
            .should('have.text', '1');

        inventoryPage.addProductToCartByIndex(TestData.productIndices.second);
        inventoryPage.getCartBadgeCount()
            .should('have.text', '2');

        inventoryPage.clickOnShoppingCart();
        cartPage.isLoaded();

        cartPage.getCartItemCount()
            .should('eq', 2);

        let cartItemNames = [];

        cartPage.elements.cartItemNames().each(($el) => {
            cartItemNames.push($el.text());
        }).then(() => {
            expect(cartItemNames.length).to.equal(2);
        });
    });

    it('Deve verificar se os nomes dos produtos adicionados correspondem aos produtos no carrinho', () => {
        const productNames = [];

        inventoryPage.getProductNameByIndex(TestData.productIndices.first).then(name => {
            productNames.push(name);
            inventoryPage.addProductToCartByIndex(TestData.productIndices.first);
        });

        inventoryPage.getProductNameByIndex(TestData.productIndices.second).then(name => {
            productNames.push(name);
            inventoryPage.addProductToCartByIndex(TestData.productIndices.second);
        });

        inventoryPage.getCartBadgeCount()
            .should('have.text', '2');
        inventoryPage.clickOnShoppingCart();
        cartPage.isLoaded();
        cartPage.verifyProductsInCart(productNames);
    });

    it('Deve remover um produto do carrinho e verificar se o contador é atualizado', () => {
        inventoryPage.addProductToCartByIndex(TestData.productIndices.first);
        inventoryPage.addProductToCartByIndex(TestData.productIndices.second);
        inventoryPage.getCartBadgeCount()
            .should('have.text', '2');

        inventoryPage.clickOnShoppingCart();
        cartPage.isLoaded();

        cartPage.removeItemByIndex(0);
        inventoryPage.getCartBadgeCount()
            .should('have.text', '1');
        cartPage.getCartItemCount()
            .should('eq', 1);
    });

    it('Deve verificar se o botão "Continue Shopping" retorna para a página de inventário', () => {
        inventoryPage.addProductToCartByIndex(TestData.productIndices.first);
        inventoryPage.clickOnShoppingCart();
        cartPage.isLoaded();
        cartPage.clickContinueShopping();
        inventoryPage.isLoaded();
    });

    it('Deve completar o processo de checkout com sucesso', () => {
        inventoryPage.addProductToCartByIndex(TestData.productIndices.first);
        inventoryPage.addProductToCartByIndex(TestData.productIndices.second);
        inventoryPage.clickOnShoppingCart();
        cartPage.isLoaded();

        cartPage.clickCheckout();
        cartPage.fillCheckoutInfo(TestData.checkout.firstName, TestData.checkout.lastName, TestData.checkout.postalCode);
        cartPage.clickContinue();
        cartPage.isCheckoutStepTwoLoaded();
        cartPage.clickFinish();
        cartPage.isOrderCompletePageLoaded();
        cartPage.getOrderCompleteMessage()
            .should('contain', 'Thank you for your order!');
    });

    it('Deve verificar se o preço total está correto', () => {
        inventoryPage.addProductToCartByIndex(TestData.productIndices.first);
        inventoryPage.addProductToCartByIndex(TestData.productIndices.second);

        let productPrices = [];

        inventoryPage.getProductPriceByIndex(TestData.productIndices.first).then(price => {
            productPrices.push(parseFloat(price.replace('$', '')));
        });

        inventoryPage.getProductPriceByIndex(TestData.productIndices.second).then(price => {
            productPrices.push(parseFloat(price.replace('$', '')));
        });

        inventoryPage.clickOnShoppingCart();
        cartPage.isLoaded();

        cartPage.clickCheckout();

        cartPage.fillCheckoutInfo(TestData.checkout.firstName, TestData.checkout.lastName, TestData.checkout.postalCode);
        cartPage.clickContinue();

        cartPage.getSubtotal().then(subtotal => {
            const subtotalValue = parseFloat(subtotal.replace('Item total: $', ''));
            const expectedSubtotal = productPrices.reduce((sum, price) => sum + price, 0);
            expect(subtotalValue).to.be.closeTo(expectedSubtotal, 0.01);
        });

        cartPage.getTax().then(tax => {
            const taxValue = parseFloat(tax.replace('Tax: $', ''));
            expect(taxValue).to.be.greaterThan(0);
        });
        
        cartPage.getTotal().then(total => {
            const totalValue = parseFloat(total.replace('Total: $', ''));
            const expectedSubtotal = productPrices.reduce((sum, price) => sum + price, 0);
            expect(totalValue).to.be.greaterThan(expectedSubtotal);
        });
    });
});