/// <reference types="cypress"/>

const loginPageUrl = 'https://qa.kenyahmis.org/openmrs/spa/login';

describe('Kenya EMR Login', () => {
  beforeEach(() => {
  it('should verify successful login', () => {

    // Navigate to the login page before each test 
    cy.visit(loginPageUrl);

    cy.get('#username').type("admin")
    cy.contains('Continue').click()
    cy.get('#password').type("Admin123")
    cy.contains('Log in').click()
    

    // Check for specific element on the landing page
    // This element shoud be present only if the login is successful
    cy.contains('Total Visits Today').should('be.visible'),{ timeout: 400000 }   
  });


  it('should show an error message for invalid password', () => {
    // Visit the login page
    cy.visit(loginPageUrl);

    cy.get('#username').type('admin'); // Enter username

    cy.contains('Continue').click(); // Click the "Continue" button (ensure this triggers the password field)
    cy.get('#password').type('Admin1234'); // Enter invalid password
    cy.get('button[type="submit"]').click(); // Click the login button

    // Verify error message is displayed with a custom timeout
    cy.contains('Invalid username or password', { timeout: 60000 }).should('be.visible');
  });


  it('should return an error message for invalid Username', () => {
    
    cy.visit(loginPageUrl); // Visit the login page

    cy.get('#username').type('admin1'); // Enter username
    cy.contains('Continue').click(); // Click the "Continue" button (ensure this triggers the password field)
    cy.get('#password').type('Admin123'); // Enter valid password
    cy.get('button[type="submit"]').click(); // Click the login button

    // Verify error message is displayed with a custom timeout
    cy.contains('Invalid username or password', { timeout: 60000 }).should('be.visible');
  });



  it('should show an error message for both invalid Username and password', () => {
    
    cy.visit(loginPageUrl); // Visit the login page

    cy.get('#username').type('admin1'); // Enter invalid username
    cy.contains('Continue').click(); // Click the "Continue" button (ensure this triggers the password field)
    cy.get('#password').type('Admin1234'); // Enter invalid password
    cy.get('button[type="submit"]').click(); // Click the login button

    // Verify error message is displayed with a custom timeout
    cy.contains('Invalid username or password', { timeout: 60000 }).should('be.visible');
  });


    it('should display an error message if username contains special characters', () => {
      
      cy.visit(loginPageUrl); // Visit the login page
  
      cy.get('#username').type('admin##'); // Enter username with special characters
      cy.contains('Continue').click(); // Click the "Continue" button (ensure this triggers the password field)
      cy.get('#password').type('Admin123'); // Enter invalid password
      cy.get('button[type="submit"]').click(); // Click the login button
  
      // Verify error message is displayed with a custom timeout
      cy.contains('Invalid username or password', { timeout: 60000 }).should('be.visible');
    });



});
});
