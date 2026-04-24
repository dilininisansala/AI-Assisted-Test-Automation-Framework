/// <reference types="cypress" />

describe('Login Functionality', () => {

  let userData;

  beforeEach(() => {
    cy.visit('/');    
    
    // Load the fixture data before the tests
    cy.fixture('loginUserData').then((user) => {
      userData = data;
    });
  });

  // Positive Test Case for Login with valid data
  it('Login with valid credentials', () => {    
      const data = userData.validUser;
    
      cy.contains("Signup / Login").click();
      cy.get("[data-qa='login-email']").type(data.email);
      cy.get("[data-qa='login-password']").type(data.password);
      cy.get("[data-qa='login-button']").click();
      cy.contains("Logged in as").should('be.visible');

    });

  // Negative Test Case for invalid email
  it('Login with invalid credentials', () => {    
      const data = userData.invalidUser;
    
      cy.contains("Signup / Login").click();
      cy.get("[data-qa='login-email']").type(data.email);
      cy.get("[data-qa='login-password']").type(data.password);
      cy.get("[data-qa='login-button']").click();
      cy.contains("Your email or password is incorrect!").should('be.visible');

    });
});


