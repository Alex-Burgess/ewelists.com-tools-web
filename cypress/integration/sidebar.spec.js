import TestFilter from '../support/TestFilter';

const links = [
  ['Dashboard', '/admin/dashboard'],
  ['Create New Product', '/admin/create-product'],
  ['Update Product', '/admin/update-product'],
  ['Update Users Gifts', '/admin/update-users-gifts']
]

TestFilter(['smoke', 'regression'], () => {
  describe('Sidebar Navigation Tests', () => {
    let user = {}

    before(() => {
      cy.fixture('sidebar.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/sidebar.json').then((result) => {
        const seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
      })
    })

    after(() => {
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify({"user_email": user.email}) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    beforeEach(function () {
      cy.login(user.email, user.password)
      cy.visit('/admin/dashboard')
    })

    it('should have nav bar links', () => {
      // Desktop Sidebar should be visible, mobile hidden
      cy.get('#admin-desktop-sidebar').should('have.css', 'visibility', 'visible')
      cy.get('#admin-mobile-sidebar').should('have.css', 'visibility', 'hidden')

      // Should have home link
      cy.get('#admin-desktop-sidebar').find('[data-cy=sidebar-link-home]').should('have.attr', 'href', Cypress.config().baseUrl)

      // Should have logout link
      cy.get('#admin-desktop-sidebar').find('[data-cy=sidebar-logout]').should('have.attr', 'href', '/logout')

      // Should have page links
      cy.get('#admin-desktop-sidebar').find('[data-cy=sidebar-links]').find('a').as('sidebar-links')

      let id = 0
      links.forEach((link) => {
        cy.get('@sidebar-links').eq(id)
          .should('have.attr', 'href', link[1])
          .find('div').contains(link[0])

        id = id + 1
      })
    })

    it('should have mobile nav bar links', () => {
      cy.viewport('iphone-x')

      // mobile starts hidden
      cy.get('#admin-mobile-sidebar').should('have.css', 'visibility', 'hidden')

      // Should be visible after button click
      cy.get('[data-cy=mobile-nav-button]').click()
      cy.get('#admin-mobile-sidebar').should('have.css', 'visibility', 'visible')

      // Should have home link
      cy.get('#admin-mobile-sidebar').find('[data-cy=sidebar-link-home]').should('have.attr', 'href', Cypress.config().baseUrl)

      // Should have logout link
      cy.get('#admin-mobile-sidebar').find('[data-cy=sidebar-logout]').should('have.attr', 'href', '/logout')

      // Should have page links
      cy.get('#admin-mobile-sidebar').find('[data-cy=sidebar-links]').find('a').as('sidebar-links')

      let id = 0
      links.forEach((link) => {
        cy.get('@sidebar-links').eq(id)
          .should('have.attr', 'href', link[1])
          .find('div').contains(link[0])

        id = id + 1
      })
    })

  })
})
