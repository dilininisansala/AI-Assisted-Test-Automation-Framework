
describe('Product Checkout Flows', () => {

  beforeEach(() => {
    cy.visit('/');    
  });

  it('Single Product Checkout', () => {

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
      cy.get("View Cart").click();
      cy.get(".btn.btn-default.check_out").click();
      cy.contains("Review Your Order").should('be.visible');
      cy.get(".btn.btn-default.check_out").click();
      cy.contains("Payment").should('be.visible');
      cy.get("input[name='name_on_card']").type('teena smith');
      cy.get("input[name='card_number']").type('1234567890');
      cy.get("input[placeholder='ex. 311']").type('123');
      cy.get("input[placeholder='MM']").type('06');
      cy.get("input[placeholder='YYYY']").type('2028');
      cy.get("#submit").click();
      cy.contains("Your order has been placed successfully!").should('be.visible');
      cy.contains("Congratulations! Your order has been confirmed!").should('be.visible');

    });
  });

});
