/// <reference types="cypress" />

describe('Product Search & Add to Cart', () => {
  it('should search for a product and add it to cart', () => {
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
  });
});
