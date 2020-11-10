import TestFilter from '../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Create New Product E2E Tests', () => {
    let seedResponse = {}
    let user = {}

    before(function () {
      cy.fixture('create-product.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/create-product.json').then((result) => {
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
      cy.visit('/admin/create-product')

      cy.fixture('product-missing').then((product) => {
        this.missing_product = product
      })

      cy.fixture('product2').then((product) => {
        this.product = product
      })
    })

    it('Creates new product with custom data', function () {
      cy.contains('Search For Url')

      // Search for url
      cy.get('#search-url').type(this.missing_product.productUrl)
      cy.get('[data-cy=search-button]').click()

      // Check form is displayed with correct info and button states
      cy.get('[data-cy=submit-button]').contains('Create')
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "none")

      cy.get('[data-cy=alt-button]').contains('Clear')
      cy.get('[data-cy=alt-button]').should('have.css', "pointer-events", "auto")

      cy.get('#retailer').should('have.value', this.missing_product.retailer)
      cy.get('#product-link').should('have.value', this.missing_product.productUrl)

      // Complete form
      cy.get('#brand').type(this.missing_product.brand).should('have.value', this.missing_product.brand)
      cy.get('#price').type(this.missing_product.price).should('have.value', this.missing_product.price)
      cy.get('#details').type(this.missing_product.details).should('have.value', this.missing_product.details)
      cy.get('#image-link').type(this.missing_product.imageUrl).should('have.value', this.missing_product.imageUrl)

      cy.get('[type=checkbox]').eq(1).uncheck()
      cy.get('[type=checkbox]').eq(2).uncheck()

      cy.get('[data-cy=submit-button]').click()

      // Check result
      cy.get('[data-cy=submit-button]').contains('Success!')
      cy.get('[data-cy=alt-button]').contains('Create Next')
      cy.contains("New products Id")

      // Get product id to clean up DB state
      cy.get("#success-message").invoke("text").as("products_id")
      cy.get('@products_id').then((value) => {
        const id = value.split(': ')[1]
        cy.log(id)
        seedResponse['product_ids'] = [id]
      });
    })

    it('Creates new product with metadata', function () {
      cy.contains('Search For Url')

      // Search for url
      cy.get('#search-url').type(this.product.productUrl)
      cy.get('[data-cy=search-button]').click()

      // Check form is displayed with correct info and button states
      cy.get('[data-cy=submit-button]').contains('Create')
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "none")

      cy.get('[data-cy=alt-button]').contains('Clear')
      cy.get('[data-cy=alt-button]').should('have.css', "pointer-events", "auto")

      cy.get('#retailer').should('have.value', this.product.retailer)
      cy.get('#product-link').should('have.value', this.product.productUrl)

      // Complete form
      cy.get('#price').type(this.product.price).should('have.value', this.product.price)

      cy.get('[type=checkbox]').eq(1).uncheck()
      cy.get('[type=checkbox]').eq(2).uncheck()

      cy.get('[data-cy=submit-button]').click()

      // Check result
      cy.get('[data-cy=submit-button]').contains('Success!')
      cy.get('[data-cy=alt-button]').contains('Create Next')
      cy.contains("New products Id")

      // Get product id to clean up DB state
      cy.get("#success-message").invoke("text").as("products_id")
      cy.get('@products_id').then((value) => {
        const id = value.split(': ')[1]
        cy.log(id)
        seedResponse['product_ids'] = [id]
      });
    })
  })
})

TestFilter(['regression'], () => {
  describe('Create New Product Page Tests', () => {
    let user = {}

    before(() => {
      cy.fixture('create-product.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/create-product.json').then((result) => {
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
      cy.visit('/admin/create-product')

      cy.fixture('product').then((product) => {
        this.product = product
      })

      cy.get('#search-url').type('https://noname.com')
      cy.get('[data-cy=search-button]').click()
    })

    it('should clear form', function () {
      cy.get('[data-cy=alt-button]').contains('Clear')
      cy.get('[data-cy=alt-button]').click()
      cy.get('#search-url').should('have.value', '')
      cy.contains('Enter New Product Details').should('not.exist')
    })

    it('should have disabled submit button with incomplete form', function () {
      // Start with valid form
      cy.get('#brand').type(this.product.brand)
      cy.get('#price').type(this.product.price)
      cy.get('#details').type(this.product.details)
      cy.get('#image-link').type(this.product.imageUrl)
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "auto")

      // If any field is empty, form is invalid.
      cy.get('#brand').clear()
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "none")
      cy.get('#brand').type(this.product.brand)

      cy.get('#retailer').clear()
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "none")

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
