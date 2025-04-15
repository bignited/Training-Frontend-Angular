class loginPage{

    elements = {
        usernameInput : () => cy.get('#input-username'),      
        passwordInput : () => cy.get('#input-password'),    
        loginBtn : () => cy.get('#button-login'),
        errorTxt : () => cy.get('p')
    }
  }
  export default loginPage;