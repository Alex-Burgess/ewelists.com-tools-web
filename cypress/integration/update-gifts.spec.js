import TestFilter from '../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Update Users Gifts E2E Tests', () => {
    let seedResponse = {}
    let user = {}

    afterEach(() => {
      seedResponse['user_email'] = user.email
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify(seedResponse) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    beforeEach(function () {
      cy.fixture('product2').then((product) => {
        this.product = product
      })

      cy.fixture('update-gifts.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/update-gifts.json').then((result) => {
        seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
        cy.log("List ID: " + seedResponse.list_id)
        cy.log("Products IDs: " + seedResponse.product_ids)
        cy.login(user.email, user.password)
      })
    })

    it('Updates new gift', function () {
      cy.visit('/admin/update-users-gifts')

      // Test the notfound items table loads correctly
      cy.contains('NotFound Items')
      cy.get('table').contains('td', 'Baby Cardigan');

      // Find link to test item
      cy.get('table').get('a[href="/admin/update-users-gifts/' + seedResponse.product_ids[0] + '"]').eq(0).click();
      cy.contains('Product ID: ' + seedResponse.product_ids[0])
      cy.contains('John Lewis')

      // Complete form
      cy.get('#brand').clear().type(this.product.brand)
      cy.get('#price').type(this.product.price)
      cy.get('#details').clear().type(this.product.details)
      cy.get('#image-link').type(this.product.imageUrl)
      cy.get('[data-cy=submit-button]').click()
      cy.get('[data-cy=submit-button]').contains('Success!')
      cy.get('[data-cy=alt-button]').contains('Update Next')

      // Get product id to delete
      cy.get("#success-message").invoke("text").then((value) => {
        const id = value.split(': ')[1]
        cy.log("New productId:" + id)
        seedResponse['product_ids'].push(id)
      });

      // Check table is reloaded
      cy.get('[data-cy=alt-button]').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/admin/update-users-gifts')
    })

    it('Updates new gift with search hidden', function () {
      cy.visit('/admin/update-users-gifts')

      // Test the notfound items table loads correctly
      cy.contains('NotFound Items')
      cy.get('table').contains('td', 'Baby Cardigan');

      // Find link to test item
      cy.get('table').get('a[href="/admin/update-users-gifts/' + seedResponse.product_ids[0] + '"]').eq(0).click();
      cy.contains('Product ID: ' + seedResponse.product_ids[0])
      cy.contains('John Lewis')

      // Complete form
      cy.get('#brand').clear().type(this.product.brand)
      cy.get('#price').type(this.product.price)
      cy.get('#details').clear().type(this.product.details)
      cy.get('#image-link').type(this.product.imageUrl)
      cy.get('[type=checkbox]').check()
      cy.get('[data-cy=submit-button]').click()
      cy.get('[data-cy=submit-button]').contains('Success!')
      cy.get('[data-cy=alt-button]').contains('Update Next')

      // Get product id to delete
      cy.get("#success-message").invoke("text").then((value) => {
        const id = value.split(': ')[1]
        cy.log("New productId:" + id)
        seedResponse['product_ids'].push(id)
      });

      // Check table is reloaded
      cy.get('[data-cy=alt-button]').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/admin/update-users-gifts')
    })
  })
})


TestFilter(['regression'], () => {
  describe('Update Users Gifts Form Tests', () => {
    let seedResponse = {}
    let user = {}

    before(() => {
      cy.fixture('update-gifts.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/update-gifts.json').then((result) => {
        seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
        cy.log("List ID: " + seedResponse.list_id)
        cy.log("Products IDs: " + seedResponse.product_ids)
      })
    })

    after(() => {
      seedResponse['user_email'] = user.email
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify(seedResponse) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    beforeEach(function () {
      cy.fixture('product2').then((product) => {
        this.product = product
      })

      cy.login(user.email, user.password)
      cy.visit('/admin/update-users-gifts')
      cy.get('table').get('a[href="/admin/update-users-gifts/' + seedResponse.product_ids[0] + '"]').eq(0).click();
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
