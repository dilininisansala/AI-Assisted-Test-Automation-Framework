
describe('Product Checkout Flows', () => {

  beforeEach(() => {
    cy.visit('/');    
  });

  it('Empty Cart Checkout', () => {

    cy.fixture('loginUserData').then((user) => {
      const data = user[undefined];
      cy.get("a[href='/login']").click();
      cy.get("input[data-qa='login-email']").type('teena@gmail.com');
      cy.get("input[placeholder='Password']").type('teena123');
      cy.get("button[data-qa='login-button']").click();
      cy.contains("Cart is empty! Click here to buy products.").should('be.visible');

    });
  });

});
