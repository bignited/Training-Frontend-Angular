Cypress.Commands.add("login", ({username, password}) => { 
    cy.visit('http://localhost:4200')

    cy.get('#input-username')
      .type(username)

    cy.get('#input-password')
      .type(password)

    cy.get('#button-login').click()
})
