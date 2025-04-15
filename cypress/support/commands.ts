import {loginPage} from "../PageObject/LoginPage"; 
 
Cypress.Commands.add("login", (username, password) => { 
    cy.visit('/');

    cy.get(loginPage.input.username).type(username)
    cy.get(loginPage.input.password).type(password);
    cy.get(loginPage.button.login).click();
})