import TestFilter from '../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Login Error Tests', () => {
    it('Fails login with wrong username and password error', () => {
      const userEmail = "adminuser+login@gmail.com"

      cy.visit('/')
      cy.contains('ewelists admin tools')

      cy.get('#email')
        .type(userEmail)
        .should('have.value', userEmail)

      cy.get('#password')
        .type('P4ssw0rd!')
        .should('have.value', 'P4ssw0rd!')

      cy.get('[data-cy=login]').click()

      // We should get error
      cy.contains('User does not exist')
    })
  })

  describe('Login E2E Tests', () => {
    let user = {}

    beforeEach(() => {
      cy.fixture('auth.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/auth.json').then((result) => {
        const seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
      })
    })

    afterEach(() => {
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify({"user_email": user.email}) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    it('Logs in with username and password', () => {
      cy.visit('/')
      cy.contains('ewelists admin tools')

      cy.get('#email')
        .type(user.email)
        .should('have.value', user.email)

      cy.get('#password')
        .type(user.password)
        .should('have.value', user.password)

      cy.get('[data-cy=login]').click()

      // we should be redirected to dashboard
      cy.contains('Dashboard')
      cy.url().should('eq', Cypress.config().baseUrl + '/admin/dashboard')
    })

    it('Logs out', () => {
      cy.login(user.email, user.password)
      cy.visit('/')
      cy.url().should('eq', Cypress.config().baseUrl + '/admin/dashboard')
      cy.contains('Dashboard')


      cy.contains('Logout').click()

      // we should be redirected to /
      cy.contains('ewelists admin tools')
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })
})
