import './commands'

declare global {
    namespace Cypress {
       interface Chainable {
         login(username: string, password: string): Chainable<void>
         login({username, password}): Chainable<void>
       }
     }
}