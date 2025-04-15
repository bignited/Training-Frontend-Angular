import {loginPage} from "../PageObject/LoginPage"; 
 
Cypress.Commands.add("login", (username, password) => { 
    cy.visit('/');

    cy.get(loginPage.usernameInput).type(username)
    cy.get(loginPage.passwordInput).type(password);
    cy.get(loginPage.loginBtn).click();
})