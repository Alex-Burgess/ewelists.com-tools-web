import TestFilter from '../support/TestFilter';

TestFilter(['regression'], () => {
  describe('Form Validation Tests', () => {
    let user = {}

    before(() => {
      cy.fixture('forms.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/forms.json').then((result) => {
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
    })

    it('should show incorrect price error', () => {
        cy.get('#price').type('10')
        cy.contains('Use 2 decimal places')
    })

    it('should not show incorrect price error', () => {
        cy.get('#price').type('10.00')
        cy.contains('Use 2 decimal places').should('not.exist')
    })

    it('should show incorrect url error', () => {
        cy.get('#product-link').type('http')
        cy.contains('Url is not valid')
    })

    it('should not show incorrect url error', () => {
        cy.get('#product-link').type('https://totterandtumble.co.uk')
        cy.contains('Url is not valid').should('not.exist')
    })

    it('should show incorrect url error', () => {
        cy.get('#image-link').type('http')
        cy.contains('Url is not valid')
    })

    it('should not show incorrect url error', () => {
        cy.get('#image-link').type('https://johnlewis.scene7.com/is/image/JohnLewis/235862595?$rsp-pdp-port-1440$')
        cy.contains('Url is not valid').should('not.exist')
    })

    it('should not show incorrect url error with amazon image', () => {
        cy.get('#image-link').type('//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B019W1SJFK&Format=_SL250_&ID=AsinImage&MarketPlace=GB&ServiceVersion=20070822&WS=1&tag=ewelists-21&language=en_GB')
        cy.contains('Url is not valid').should('not.exist')
    })

    it.skip('should convert amazon html image code to image url', () => {
        cy.get('#image-link').type('<a href="https://www.amazon.co.uk/BabyBj%C3%B6rn-Baby-Carrier-Move-Mesh/dp/B085LLKZ19/ref=as_li_ss_il?ie=UTF8&aaxitk=6es3azfK7zGaXWNaNTQ19g&hsa_cr_id=3298390640402&ref_=sbx_be_s_sparkle_mcd_asin_0&linkCode=li3&tag=ewelists-21&linkId=d723882a916cc092c3e21547ee460934&language=en_GB" target="_blank"><img border="0" src="//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B085LLKZ19&Format=_SL250_&ID=AsinImage&MarketPlace=GB&ServiceVersion=20070822&WS=1&tag=ewelists-21&language=en_GB" ></a><img src="https://ir-uk.amazon-adsystem.com/e/ir?t=ewelists-21&language=en_GB&l=li3&o=2&a=B085LLKZ19" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />')
        cy.contains('Url is not valid').should('not.exist')
        cy.get('#image-link').should('have.value', '//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B085LLKZ19&Format=_SL250_&ID=AsinImage&MarketPlace=GB&ServiceVersion=20070822&WS=1&tag=ewelists-21&language=en_GB')
    })

    it('should show johnlewis.com', () => {
        cy.get('#product-link').type('https://www.johnlewis.com/mini-micro-deluxe-scooter-2-5-years/aqua/p3567221')
        cy.get('#retailer').should('have.value', 'johnlewis.com')
    })

    it('should show totterandtumble.co.uk', () => {
        cy.get('#product-link').type('https://totterandtumble.co.uk')
        cy.get('#retailer').should('have.value', 'totterandtumble.co.uk')
    })

    it('should show amazon.co.uk', () => {
        cy.get('#product-link').type('https://www.amazon.co.uk/dp/B07VPLM7G4/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=ewelists-21&linkId=36454e467f223fc76811ad5571e84e3f&language=en_GB')
        cy.get('#retailer').should('have.value', 'amazon.co.uk')
    })

    it('should convert amzn.to to amazon.co.uk', () => {
        cy.get('#product-link').type('https://amzn.to/2QNzavU')
        cy.get('#retailer').should('have.value', 'amazon.co.uk')
    })
  })
})

TestFilter(['regression'], () => {
  describe('Product Details Card Tests', () => {
    let user = {}

    before(() => {
      cy.fixture('forms.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/forms.json').then((result) => {
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
      cy.fixture('product').then((product) => {
        this.product = product
      })
      
      cy.login(user.email, user.password)
      cy.visit('/admin/create-product')
    })

    it('should have product details link and image', function () {
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
