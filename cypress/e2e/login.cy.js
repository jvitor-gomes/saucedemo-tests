import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import TestData from '../utils/TestData';

describe('Testes de Login', () => {
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();

    beforeEach(() => {
        loginPage.visit();
    });

    it('Deve fazer login com sucesso usando credenciais válidas', () => {
        loginPage.login(TestData.users.standard.username, TestData.users.standard.password);

        inventoryPage.isLoaded();
        cy.url().should('include', '/inventory.html');
    });

    it('Deve exibir mensagem de erro ao tentar login com usuário bloqueado', () => {
        loginPage.login(TestData.users.locked.username, TestData.users.locked.password);

        loginPage.getErrorMessage()
            .should('be.visible');
            
        loginPage.getErrorMessage()
            .should('contain.text', 'Epic sadface: Sorry, this user has been locked out');
    });

    it('Deve exibir mensagem de erro ao tentar login com senha inválida', () => {
        loginPage.login(TestData.users.standard.username, 'senha_incorreta');

        loginPage.getErrorMessage()
            .should('be.visible');

        loginPage.getErrorMessage()
            .should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
    });
});