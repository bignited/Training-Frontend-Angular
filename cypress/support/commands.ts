import {loginPage} from "../PageObject/LoginPage"; 
 
Cypress.Commands.add("login", (username, password) => { 
    cy.visit('/');

    cy.get(loginPage.input.usernameInput).type(username)
    cy.get(loginPage.input.passwordInput).type(password);
    cy.get(loginPage.button.loginBtn).click();
})