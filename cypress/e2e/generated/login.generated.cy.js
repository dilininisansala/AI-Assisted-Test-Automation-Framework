
describe('Login Functionality', () => {

  beforeEach(() => {
    cy.visit('/');    
  });

  it('Login with valid credentials', () => {

    cy.fixture('loginUserData').then((user) => {
      const data = user["validUser"];
      cy.contains("Signup / Login").click();
      cy.get("[data-qa='login-email']").type(data.email);
      cy.get("[data-qa='login-password']").type(data.password);
      cy.get("[data-qa='login-button']").click();
      cy.contains("Logged in as").should('be.visible');

    });
  });

  it('Login with invalid credentials', () => {

    cy.fixture('loginUserData').then((user) => {
      const data = user["invalidUser"];
      cy.contains("Signup / Login").click();
      cy.get("[data-qa='login-email']").type(data.email);
      cy.get("[data-qa='login-password']").type(data.password);
      cy.get("[data-qa='login-button']").click();
      cy.contains("Your email or password is incorrect!").should('be.visible');

    });
  });

});
