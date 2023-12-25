import {WelcomeMessage} from "../../fixtures/Project_test_data/01.01_SignIn_to_Jenkins.json"
import {WelcomeMessage2} from "../../fixtures/Project_test_data/01.01_SignIn_to_Jenkins.json"
import {ErrorMessage} from "../../fixtures/Project_test_data/01.01_SignIn_to_Jenkins.json"

const localhost = Cypress.env("local.host")
const localport = Cypress.env("local.port")

describe('01.01_SignIn_to_Jenkins: valid', () => {
  
    it('valid credentials', () => {
        cy.get('.empty-state-block h1').invoke('text').should('to.eql', WelcomeMessage)
        .get('.empty-state-block p').invoke('text').should('to.eql', WelcomeMessage2)
    });

    it('invalid credentials', () => {
      cy.visit(`http://${localhost}:${localport}/login`)
        cy.get('#j_username').type('b')
        .get('#j_password').type('a')
        .get('.jenkins-button--primary').click()
        .get('.app-sign-in-register__error').invoke('text').should('to.eql', ErrorMessage)
    });
    
});