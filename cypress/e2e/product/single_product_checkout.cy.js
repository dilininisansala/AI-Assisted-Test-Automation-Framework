/// <reference types="cypress" />

describe('Single product checkout', () => {
  it('should add a single product and checkout', () => {
    cy.visit('/login');

    // Search for product
    cy.get('input[data-qa="login-email"]').type('teena@gmail.com');
    cy.get('input[placeholder="Password"]').type('teena123');
    cy.get('button[data-qa="login-button"]').click();
    cy.contains('Products').click();

    // Search for product
    cy.get('#search_product').type('Dress');
    cy.get('#submit_search').click();

    // Click on product and add to cart
    cy.get('.product-overlay', { timeout: 15000 }).should('be.visible');    
    cy.get('.product-overlay').first().trigger('mouseover');
    cy.get('.product-overlay a[data-product-id]').first().click({ force: true }); // Add to cart
    cy.get('#cartModal').should('be.visible');
    cy.contains('Added! Your product has been added to cart').should('be.visible');

    // Assert product added
    cy.contains('View Cart').click();
    cy.url().should('include', '/view_cart');
    cy.get('.btn.btn-default.check_out').click();
    cy.contains('Review Your Order').should('be.visible');
    cy.get('.btn.btn-default.check_out').click();
    cy.contains('Payment').should('be.visible');

    // Enter card details
    cy.get('input[name="name_on_card"]').type('teena smith');
    cy.get('input[name="card_number"]').type('1234567890');
    cy.get('input[placeholder="ex. 311"]').type('123');
    cy.get('input[placeholder="MM"]').type('06');
    cy.get('input[placeholder="YYYY"]').type('2028');
    cy.get('#submit').click();
    cy.contains('Your order has been placed successfully!').should('be.visible');
    cy.url().should('include', '/payment_done');
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
  });
});


