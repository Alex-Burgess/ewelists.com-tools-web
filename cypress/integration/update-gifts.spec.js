import TestFilter from '../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Update Users Gifts E2E Tests', () => {
    const userEmail = "adminuser+updategifts@gmail.com"
    let listId = ''
    let userId = ''
    let notFoundId = ''
    let productId = ''

    before(function () {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n "Cypress AdminUser" -U ' + Cypress.env("userPoolId")).then((result) => {
        userId = result.stdout
        cy.log('User ID: ' + userId)

        cy.exec(Cypress.env('createListScript') + ' -u ' + userId + ' -t ' + Cypress.env("listsTable")).then((result) => {
          listId = result.stdout
          cy.log('List ID: ' + listId)

          cy.exec(Cypress.env('createNotFoundScript') + ' -L ' + Cypress.env("listsTable") + ' -N ' + Cypress.env("notfoundTable") + ' -u ' + userId + ' -l ' + listId ).then((result) => {
            notFoundId = result.stdout
            cy.log('Notfound Product ID: ' + notFoundId)
          })
        })
      })
    })

    beforeEach(function () {
      cy.login(userEmail, 'P4ssw0rd!')
      cy.visit('/admin/update-users-gifts')

      cy.fixture('product2').then((product) => {
        this.product = product
      })
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId"))
      cy.exec(Cypress.env('deleteListScript') + ' -l ' + listId + ' -u ' + userId + ' -t ' + Cypress.env("listsTable"))
      cy.exec(Cypress.env('deleteProductScript') + ' -p ' + notFoundId + ' -t ' + Cypress.env("notfoundTable"))
      if (productId.length > 0) {
          cy.exec(Cypress.env('deleteProductScript') + ' -p ' + productId + ' -t ' + Cypress.env("productsTable"))
      }
    })

    it('Updates new gift', function () {
      // Test the notfound items table loads correctly
      cy.contains('NotFound Items')
      cy.get('table').contains('td', 'Baby Cardigan');

      // Find link to test item
      cy.get('table').get('a[href="/admin/update-users-gifts/' + notFoundId + '"]').eq(0).click();
      cy.contains('Product ID: ' + notFoundId)

      // Complete form
      cy.get('#brand').clear().type(this.product.brand)
      cy.get('#price').type(this.product.price)
      cy.get('#details').clear().type(this.product.details)
      cy.get('#image-link').type(this.product.imageUrl)
      cy.get('[data-cy=submit-button]').click()
      cy.get('[data-cy=submit-button]').contains('Success!')
      cy.get('[data-cy=alt-button]').contains('Update Next')

      // Check table is reloaded
      cy.get('[data-cy=alt-button]').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/admin/update-users-gifts')
    })
  })
})


TestFilter(['regression'], () => {
  describe.only('Update Users Gifts Form Tests', () => {
    const userEmail = "adminuser+updategifts@gmail.com"
    let listId = ''
    let userId = ''
    let notFoundId = ''
    let productId = ''

    before(function () {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n "Cypress AdminUser" -U ' + Cypress.env("userPoolId")).then((result) => {
        userId = result.stdout
        cy.log('User ID: ' + userId)

        cy.exec(Cypress.env('createListScript') + ' -u ' + userId + ' -t ' + Cypress.env("listsTable")).then((result) => {
          listId = result.stdout
          cy.log('List ID: ' + listId)

          cy.exec(Cypress.env('createNotFoundScript') + ' -L ' + Cypress.env("listsTable") + ' -N ' + Cypress.env("notfoundTable") + ' -u ' + userId + ' -l ' + listId ).then((result) => {
            notFoundId = result.stdout
            cy.log('Notfound Product ID: ' + notFoundId)
          })
        })
      })
    })

    beforeEach(function () {
      cy.login(userEmail, 'P4ssw0rd!')
      cy.visit('/admin/update-users-gifts')
      cy.get('table').get('a[href="/admin/update-users-gifts/' + notFoundId + '"]').eq(0).click();

      cy.fixture('product2').then((product) => {
        this.product = product
      })
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId"))
      cy.exec(Cypress.env('deleteListScript') + ' -l ' + listId + ' -u ' + userId + ' -t ' + Cypress.env("listsTable"))
      cy.exec(Cypress.env('deleteProductScript') + ' -p ' + notFoundId + ' -t ' + Cypress.env("notfoundTable"))
      if (productId.length > 0) {
          cy.exec(Cypress.env('deleteProductScript') + ' -p ' + productId + ' -t ' + Cypress.env("productsTable"))
      }
    })

    it('should close form and show table', function () {
      cy.get('[data-cy=alt-button]').contains('Back')
      cy.get('[data-cy=alt-button]').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/admin/update-users-gifts')
    })

    it('should have disabled submit button with incomplete form', function () {
      // Complete form
      cy.get('#price').type(this.product.price)
      cy.get('#image-link').type(this.product.imageUrl)
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "auto")

      // If any field is empty, form is invalid.
      cy.get('#brand').clear()
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "none")
      cy.get('#brand').type(this.product.brand)

      cy.get('#retailer').clear()
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "none")
      cy.get('#retailer').type(this.product.retailer)

      cy.get('#price').clear()
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "none")
      cy.get('#price').type(this.product.price)

      cy.get('#details').clear()
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "none")
      cy.get('#details').type(this.product.details)

      cy.get('#product-link').clear()
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "none")
      cy.get('#product-link').type(this.product.productUrl)

      cy.get('#image-link').clear()
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "none")
      cy.get('#image-link').type(this.product.imageUrl)
    })
  })
})
