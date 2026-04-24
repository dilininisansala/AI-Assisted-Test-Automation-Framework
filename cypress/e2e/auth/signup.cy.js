/// <reference types="cypress" />

describe('Signup Page Automation', () => {
  
  it('should sign up a new user successfully', () => {
    // Visit the site
    cy.visit('/');

    // Click on Signup/Login button
    cy.contains('Signup / Login').click();

    // Fill in signup form
    cy.get('input[data-qa="signup-name"]').type('Geralds');
    cy.get('input[data-qa="signup-email"]').type('gerald@example.com');

    // Click Signup button
    cy.get('button[data-qa="signup-button"]').click();

    // Fill account information
    cy.get('#id_gender2').check(); // Select Female
    cy.get('input[data-qa="password"]').type('TestPassword123');
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1995');

    // Fill address details
    cy.get('input[data-qa="first_name"]').type('Geralds');
    cy.get('input[data-qa="last_name"]').type('Smith');
    cy.get('input[data-qa="company"]').type('Test Company');
    cy.get('input[data-qa="address"]').type('123 Test Street');
    cy.get('#country').select('India');
    cy.get('input[data-qa="state"]').type('Karnataka');
    cy.get('input[data-qa="city"]').type('Bangalore');
    cy.get('input[data-qa="zipcode"]').type('560001');
    cy.get('input[data-qa="mobile_number"]').type('9876543210');

    // Submit form
    cy.get('button[data-qa="create-account"]').click();

    // Assertion: Verify account creation
    cy.contains('Account Created!').should('be.visible');
  });

});
