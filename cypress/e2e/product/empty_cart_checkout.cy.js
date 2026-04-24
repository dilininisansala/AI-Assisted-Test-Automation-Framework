/// <reference types="cypress" />

describe('Empty Cart Checkout', () => {
  it('Should display an message when checking out with empty cart', () => {
    cy.visit('/login');    
    cy.get('input[data-qa="login-email"]').type('teena@gmail.com');
    cy.get('input[placeholder="Password"]').type('teena123');
    cy.get('button[data-qa="login-button"]').click();
    cy.visit('/view_cart');
    cy.contains('Cart is empty! Click here to buy products.').should('be.visible');
  });
});

