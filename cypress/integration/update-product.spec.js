import TestFilter from '../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Update Product E2E Tests', () => {
    let seedResponse = {}
    let user = {}

    before(function () {
      cy.fixture('update-product.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/update-product.json').then((result) => {
        seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
      })
    })

    after(() => {
      seedResponse['user_email'] = user.email
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify(seedResponse) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    beforeEach(() => {
      cy.login(user.email, user.password)
      cy.visit('/admin/update-product')
    })

    it('Updates existing product', function () {
      // Search for product
      cy.get('#search-id').type(seedResponse.product_ids[0])
      cy.get('[data-cy=search-button]').click()
      cy.contains('Comparing product across environments:')
      cy.get('#environment-results').get('li')
      cy.contains('Search Result: ' + seedResponse.product_ids[0])

      // Make Change
      cy.get('#price').clear().type('40.00')
      cy.get('[type=checkbox]').eq(1).uncheck()
      cy.get('[type=checkbox]').eq(2).uncheck()
      cy.get('[data-cy=submit-button]').click()
      cy.get('[data-cy=submit-button]').contains('Success!')
      cy.get('[data-cy=alt-button]').contains('Update Next')

      // Reset form
      cy.get('[data-cy=alt-button]').click()
      cy.contains('Search Result: ' + seedResponse.product_ids[0]).should('not.exist')
    })
  })
})

TestFilter(['regression'], () => {
  describe('Update Product Search Tests', () => {
    let seedResponse = {}
    let user = {}

    before(function () {
      cy.fixture('update-product.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/update-product.json').then((result) => {
        seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
      })
    })

    after(() => {
      seedResponse['user_email'] = user.email
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify(seedResponse) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    beforeEach(() => {
      cy.login(user.email, user.password)
      cy.visit('/admin/update-product')
    })

    it('should have disabled search button until product id entered', function () {
      cy.get('[data-cy=search-button]').should('have.css', "pointer-events", "none")
      cy.get('#search-id').type('12345678-abcd-efgh-1234-abcdefghijkl')
      cy.get('[data-cy=search-button]').should('have.css', "pointer-events", "auto")
    })

    it('should clear search field', function () {
      cy.get('#search-id').type('12345678-abcd-efgh-1234-abcdefghijkl')
      cy.get('[data-cy=clear-search-button]').click()
      cy.get('#search-id').should('have.value', '')
    })

    it('should show product not found error', function () {
      cy.get('#search-id').type('12345678-abcd-efgh-1234-abcdefghijkl')
      cy.get('[data-cy=search-button]').click()
      cy.contains('No product exists with id: 12345678-abcd-efgh-1234-abcdefghijkl')
    })

    it('should return update form', function () {
      cy.get('#search-id').type(seedResponse.product_ids[0])
      cy.get('[data-cy=search-button]').click()
      cy.contains('Search Result: ' + seedResponse.product_ids[0])
    })

    it('should clear search field and close update form', function () {
      cy.get('#search-id').type(seedResponse.product_ids[0])
      cy.get('[data-cy=search-button]').click()
      cy.contains('Search Result: ' + seedResponse.product_ids[0])

      // Clear form
      cy.get('[data-cy=clear-search-button]').click()
      cy.get('#search-id').should('have.value', '')
      cy.contains('Search Result: ' + seedResponse.product_ids[0]).should('not.exist')
    })
  })
})


TestFilter(['regression'], () => {
  describe('Update Product Search Result Form Tests', () => {
    let seedResponse = {}
    let user = {}

    before(function () {
      cy.fixture('update-product.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/update-product.json').then((result) => {
        seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
      })
    })

    after(() => {
      seedResponse['user_email'] = user.email
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify(seedResponse) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    beforeEach(function () {
      cy.login(user.email, user.password)
      cy.visit('/admin/update-product')
      cy.get('#search-id').type(seedResponse.product_ids[0])
      cy.get('[data-cy=search-button]').click()

      cy.fixture('product2').then((product) => {
        this.product = product
      })
    })

    it('should clear form', function () {
      cy.get('[data-cy=alt-button]').contains('Clear')
      cy.get('[data-cy=alt-button]').click()
      cy.get('#search-id').should('have.value', '')
      cy.contains('Search Result: ' + seedResponse.product_ids[0]).should('not.exist')
    })

    it('should have disabled submit button with incomplete form', function () {
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

      // If no environments are selected form is invalid.
      cy.get('[type=checkbox]').uncheck()
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "none")

      cy.get('[type=checkbox]').eq(0).check()
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "auto")
      cy.get('[type=checkbox]').eq(0).uncheck()

      cy.get('[type=checkbox]').eq(1).check()
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "auto")
      cy.get('[type=checkbox]').eq(1).uncheck()

      cy.get('[type=checkbox]').eq(2).check()
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "auto")
      cy.get('[type=checkbox]').eq(2).uncheck()
    })
  })
})
