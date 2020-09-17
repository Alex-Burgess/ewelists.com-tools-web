import TestFilter from '../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Create New Product Tests', () => {
    const userEmail = "adminuser+create@gmail.com"

    before(function () {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n "Cypress AdminUser" -u ' + Cypress.env("userPoolId"))
      cy.login(userEmail, 'P4ssw0rd!')

      cy.fixture('product').then((product) => {
        this.product = product
      })
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -u ' + Cypress.env("userPoolId"))
    })

    it('Creates new product', function () {
      cy.visit('/admin/create-product')
      cy.contains('Enter New Product Details')

      cy.get('[data-cy=submit-button]').contains('Create')
      cy.get('[data-cy=submit-button]').should('have.css', "pointer-events", "none")

      cy.get('[data-cy=alt-button]').contains('Clear')
      cy.get('[data-cy=alt-button]').should('have.css', "pointer-events", "auto")

      cy.get('#brand')
        .type(this.product.brand)
        .should('have.value', this.product.brand)

      cy.get('#retailer')
        .type(this.product.retailer)
        .should('have.value', this.product.retailer)

      cy.get('#price')
        .type(this.product.price)
        .should('have.value', this.product.price)

      cy.get('#details')
        .type(this.product.details)
        .should('have.value', this.product.details)

      cy.get('#product-link')
        .type(this.product.productUrl)
        .should('have.value', this.product.productUrl)

      cy.get('#image-link')
        .type(this.product.imageUrl)
        .should('have.value', this.product.imageUrl)

      cy.get('[type=checkbox]').eq(1).uncheck()
      cy.get('[type=checkbox]').eq(2).uncheck()

      cy.get('[data-cy=submit-button]').click()

      cy.get('[data-cy=submit-button]').contains('Success!')
      cy.get('[data-cy=alt-button]').contains('Create Next')
      cy.contains("New products Id")

      // TODO - delete product id
    })
  })
})

TestFilter(['regression'], () => {
  describe('Create New Product Tests', () => {
    const userEmail = "adminuser+create@gmail.com"

    before(function () {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n "Cypress AdminUser" -u ' + Cypress.env("userPoolId"))
      cy.login(userEmail, 'P4ssw0rd!')

      cy.fixture('product').then((product) => {
        this.product = product
      })
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -u ' + Cypress.env("userPoolId"))
    })

    it('should show incorrect price error', () => {
        cy.visit('/admin/create-product')

        cy.get('#price').type('10')
        cy.contains('Use 2 decimal places')
    })

    it('should show incorrect url error', () => {
        cy.visit('/admin/create-product')

        cy.get('#product-link').type('http')
        cy.contains('Url is not valid')
    })

    it('should show incorrect url error', () => {
        cy.visit('/admin/create-product')

        cy.get('#image-link').type('http')
        cy.contains('Url is not valid')
    })

    it('should clear form', function () {
      cy.visit('/admin/create-product')

      cy.get('[data-cy=alt-button]').contains('Clear')

      cy.get('#brand').type(this.product.brand)
      cy.get('#retailer').type(this.product.retailer)
      cy.get('#price').type(this.product.price)
      cy.get('#details').type(this.product.details)
      cy.get('#product-link').type(this.product.productUrl)
      cy.get('#image-link').type(this.product.imageUrl)

      cy.get('[data-cy=alt-button]').click()
      cy.get('#brand').should('have.value', '')
      cy.get('#retailer').should('have.value', '')
      cy.get('#price').should('have.value', '')
      cy.get('#details').should('have.value', '')
      cy.get('#product-link').should('have.value', '')
      cy.get('#image-link').should('have.value', '')
    })

    it('should have disabled submit button with incomplete form', function () {
      cy.visit('/admin/create-product')

      // Start with valid form
      cy.get('#brand').type(this.product.brand)
      cy.get('#retailer').type(this.product.retailer)
      cy.get('#price').type(this.product.price)
      cy.get('#details').type(this.product.details)
      cy.get('#product-link').type(this.product.productUrl)
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

    it('should have product details link and image', function () {
        cy.visit('/admin/create-product')

        cy.get('#brand').type(this.product.brand)
        cy.get('#details').type(this.product.details)
        cy.get('#product-link').type(this.product.productUrl)
        cy.get('#image-link').type(this.product.imageUrl)

        cy.get('[data-cy=product-details-link]').contains(this.product.brand + " - " + this.product.details)
        cy.get('[data-cy=product-details-link]').should('have.attr', 'href', this.product.productUrl)
        cy.get('[data-cy=product-details-img]').should('have.attr', 'src', this.product.imageUrl)
    })
  })
})
