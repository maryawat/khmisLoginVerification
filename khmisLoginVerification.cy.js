/// <reference types="cypress"/>

const loginPageUrl = 'https://qa.kenyahmis.org/openmrs/spa/login';

describe('Kenya EMR Login', () => {

  it('should verify successful login', () => {
    // Navigate to the login page
    cy.visit(loginPageUrl);

    cy.get('#username').type('admin');
    cy.contains('Continue').click();
    cy.get('#password').type('Admin123');
    cy.contains('Log in').click();

    // Check for specific element on the landing page
    // This element should be present only if the login is successful
    cy.contains('Total Visits Today', { timeout: 400000 }).should('be.visible');
  });

  it('should show an error message for invalid password', () => {
    // Visit the login page
    cy.visit(loginPageUrl);

    cy.get('#username').type('admin');
    cy.contains('Continue').click();
    cy.get('#password').type('Admin1234');
    cy.get('button[type="submit"]').click();

    // Verify error message is displayed with a custom timeout
    cy.contains('Invalid username or password', { timeout: 60000 }).should('be.visible');
  });

  it('should return an error message for invalid Username', () => {
    // Visit the login page
    cy.visit(loginPageUrl);

    cy.get('#username').type('admin1');
    cy.contains('Continue').click();
    cy.get('#password').type('Admin123');
    cy.get('button[type="submit"]').click();

    // Verify error message is displayed with a custom timeout
    cy.contains('Invalid username or password', { timeout: 60000 }).should('be.visible');
  });

  it('should show an error message for both invalid Username and password', () => {
    // Visit the login page
    cy.visit(loginPageUrl);

    cy.get('#username').type('admin1');
    cy.contains('Continue').click();
    cy.get('#password').type('Admin1234');
    cy.get('button[type="submit"]').click();

    // Verify error message is displayed with a custom timeout
    cy.contains('Invalid username or password', { timeout: 60000 }).should('be.visible');
  });

  it('should display an error message if username contains special characters', () => {
    // Visit the login page
    cy.visit(loginPageUrl);

    cy.get('#username').type('admin##');
    cy.contains('Continue').click();
    cy.get('#password').type('Admin123');
    cy.get('button[type="submit"]').click();

    // Verify error message is displayed with a custom timeout
    cy.contains('Invalid username or password', { timeout: 60000 }).should('be.visible');
  });

});
