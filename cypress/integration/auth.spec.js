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
  const userEmail = "adminuser+login@gmail.com"

  beforeEach(() => {
    cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n "Cypress AdminUser" -u ' + Cypress.env("userPoolId"))
  })

  after(() => {
    cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -u ' + Cypress.env("userPoolId"))
  })

  it('Logs in with username and password', () => {
    cy.visit('/')
    cy.contains('ewelists admin tools')

    cy.get('#email')
      .type(userEmail)
      .should('have.value', userEmail)

    cy.get('#password')
      .type('P4ssw0rd!')
      .should('have.value', 'P4ssw0rd!')

    cy.get('[data-cy=login]').click()

    // we should be redirected to dashboard
    cy.contains('Dashboard')
    cy.url().should('eq', Cypress.config().baseUrl + '/admin/dashboard')
  })
})


describe('Logout E2E Tests', () => {
  const userEmail = "adminuser+logout@gmail.com"

  beforeEach(() => {
    cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n "Cypress AdminUser" -u ' + Cypress.env("userPoolId"))
    cy.login(userEmail, 'P4ssw0rd!')
  })

  after(() => {
    cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -u ' + Cypress.env("userPoolId"))
  })

  it('Logs out', () => {
    cy.visit('/')
    cy.url().should('eq', Cypress.config().baseUrl + '/admin/dashboard')
    cy.contains('Dashboard')


    cy.contains('Logout').click()

    // we should be redirected to /
    cy.contains('ewelists admin tools')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})
