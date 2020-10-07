import TestFilter from '../support/TestFilter';

const pages = [
  'dashboard',
  'create-product',
  'update-product',
  'update-users-gifts'
];

TestFilter(['smoke', 'regression'], () => {
  describe('Route Tests', () => {
    let user = {}

    before(() => {
      cy.fixture('routes.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/routes.json').then((result) => {
        const seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
      })
    })

    after(() => {
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify({"user_email": user.email}) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })


    beforeEach(() => {
      cy.login(user.email, user.password)
    })

    pages.forEach((page) => {
      it(`Should have route for ${page}`, () => {

        cy.visit(`/admin/${page}`)
        cy.contains('Dashboard')
        cy.url().should('eq', Cypress.config().baseUrl + `/admin/${page}`)
      })
    })
  })
})
