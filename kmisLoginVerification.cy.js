const loginPageUrl = 'https://qa.kenyahmis.org/openmrs/spa/login';
describe('Kenya EMR Login', () => {
  it('navigate', () => {
    
    cy.visit(loginPageUrl);

    cy.get('#username').type("admin")
    cy.contains('Continue').click()
    cy.get('#password').type("Admin123")
    cy.contains('Log in').click()
    //cy.contains('Log in{Enter}')

    // Check for specific element on the landing page
    // This element shoud be present only if the login is successful
    cy.contains('Total Visits Today').should('be.visible'),{ timeout: 400000 }   
  })
})

describe('Login Error Handling for invalid Password', () => {
  it('should show an error message for invalid password', () => {
    // Visit the login page
    cy.visit(loginPageUrl);

    // Enter username
    cy.get('#username').type('admin');

    // Click the "Continue" button (ensure this triggers the password field)
    cy.contains('Continue').click();

    // Enter invalid password
    cy.get('#password').type('Admin1234');

    // Click the login button
    cy.get('button[type="submit"]').click();

    // Verify error message is displayed with a custom timeout
    cy.contains('Invalid username or password', { timeout: 60000 }).should('be.visible');
  });
});

describe('Login Error Handling for invalid Username', () => {
  it('should show an error message for invalid Username', () => {
    // Visit the login page
    cy.visit(loginPageUrl);

    // Enter username
    cy.get('#username').type('admin1');

    // Click the "Continue" button (ensure this triggers the password field)
    cy.contains('Continue').click();

    // Enter invalid password
    cy.get('#password').type('Admin123');

    // Click the login button
    cy.get('button[type="submit"]').click();

    // Verify error message is displayed with a custom timeout
    cy.contains('Invalid username or password', { timeout: 60000 }).should('be.visible');
  });

});

describe('Login Error Handling for both invalid Username and password', () => {
  it('should show an error message for both invalid Username and password', () => {
    // Visit the login page
    cy.visit(loginPageUrl);

    // Enter username
    cy.get('#username').type('admin1');

    // Click the "Continue" button (ensure this triggers the password field)
    cy.contains('Continue').click();

    // Enter invalid password
    cy.get('#password').type('Admin1234');

    // Click the login button
    cy.get('button[type="submit"]').click();

    // Verify error message is displayed with a custom timeout
    cy.contains('Invalid username or password', { timeout: 60000 }).should('be.visible');
  });

  describe('Login Error Handling for username with alphanumeric(special) characters', () => {
    it('should show an error message for both invalid Username and password', () => {
      // Visit the login page
      cy.visit(loginPageUrl);
  
      // Enter username
      cy.get('#username').type('admin##');
  
      // Click the "Continue" button (ensure this triggers the password field)
      cy.contains('Continue').click();
  
      // Enter invalid password
      cy.get('#password').type('Admin123');
  
      // Click the login button
      cy.get('button[type="submit"]').click();
  
      // Verify error message is displayed with a custom timeout
      cy.contains('Invalid username or password', { timeout: 60000 }).should('be.visible');
    });

});

});