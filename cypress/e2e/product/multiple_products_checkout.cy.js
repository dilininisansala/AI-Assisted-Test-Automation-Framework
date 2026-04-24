/// <reference types="cypress" />

describe('Multiple product checkout', () => {
  it('Should add 3 products to cart and checkout', () => {
    cy.visit('/login');
    cy.get('input[data-qa="login-email"]').type('teena@gmail.com');
    cy.get('input[placeholder="Password"]').type('teena123');
    cy.get('button[data-qa="login-button"]').click();
        
    // Go to Products page 
    cy.contains('Products').click();
    cy.get('#search_product').type('Dress');
    cy.get('#submit_search').click();
    cy.get('.product-overlay', { timeout: 15000 }).should('be.visible');
    
    // Add first 3 products to cart
    cy.get('.product-overlay').each(($el, index) => {
      if (index < 3) {
        cy.wrap($el).trigger('mouseover');
        cy.wrap($el).find('a[data-product-id]').first().click({ force: true });

        // Wait for modal and close it only if not the last product
        if (index < 2) {
          cy.get('#cartModal').should('be.visible');
          cy.get('.btn.btn-success.close-modal.btn-block').click({ force: true });
        }
      }
    });

    // After last product, modal is still open → click popup "View Cart"
    cy.get('#cartModal').should('be.visible');
    cy.get('#cartModal').contains('View Cart').click();
    cy.url().should('include', '/view_cart');

    // Proceed to checkout
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
    
    // Assert order success
    cy.contains('Your order has been placed successfully!').should('be.visible');
    cy.url().should('include', '/payment_done');
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
  });
});