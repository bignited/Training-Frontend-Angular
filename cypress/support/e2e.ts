import './commands'

declare global {
    namespace Cypress {
       interface Chainable {
         login({username, password}): Chainable<void>
       }
     }
}