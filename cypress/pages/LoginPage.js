class LoginPage {
    elements = {
        usernameInput: () => cy.get('[data-test="username"]'),
        passwordInput: () => cy.get('[data-test="password"]'),
        loginButton: () => cy.get('[data-test="login-button"]'),
        errorMessage: () => cy.get('[data-test="error"]')
    };

    visit() {
        cy.visit('https://www.saucedemo.com/');
        this.elements.usernameInput()
            .should('be.visible');
        this.elements.passwordInput()
            .should('be.visible');
        this.elements.loginButton()
            .should('be.visible');
        return this;
    }

    typeUsername(username) {
        this.elements.usernameInput()
            .type(username);
        return this;
    }

    typePassword(password) {
        this.elements.passwordInput()
            .type(password);
        return this;
    }

    clickLogin() {
        this.elements.loginButton()
            .click();
        return this;
    }

    login(username, password) {
        this.typeUsername(username);
        this.typePassword(password);
        this.clickLogin();
        return this;
    }

    getErrorMessage() {
        return this.elements.errorMessage();
    }
}

export default LoginPage;