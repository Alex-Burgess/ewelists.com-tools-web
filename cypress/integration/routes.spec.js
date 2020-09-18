import TestFilter from '../support/TestFilter';

const pages = [
  'dashboard',
  'create-product',
  'update-product',
  'update-users-gifts'
];

TestFilter(['smoke', 'regression'], () => {
  describe('Route Tests', () => {
    const userEmail = "adminuser+routes@gmail.com"

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n "Cypress AdminUser" -U ' + Cypress.env("userPoolId"))
    })

    beforeEach(() => {
      cy.login(userEmail, 'P4ssw0rd!')
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId"))
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
