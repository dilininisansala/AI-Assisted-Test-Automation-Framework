
describe('Product Checkout Flows', () => {

  beforeEach(() => {
    cy.visit('/');    
  });

  it('Product Search and Add to Cart', () => {

    cy.fixture('loginUserData').then((user) => {
      const data = user[undefined];
      cy.get("input[data-qa='login-email']").type('teena@gmail.com');
      cy.get("input[placeholder='Password']").type('teena123');
      cy.get("button[data-qa='login-button']").click();
      cy.get("Products").click();
      cy.get("#search_product").type('Dress');
      cy.get("#submit_search").click();
      cy.get(".product-overlay a[data-product-id]").click();
      cy.contains("Added! Your product has been added to cart").should('be.visible');

    });
  });

});
