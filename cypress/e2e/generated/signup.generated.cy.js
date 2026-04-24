
describe('Signup Functionality', () => {

  beforeEach(() => {
    cy.visit('/');    
  });

  it('Signup with valid data and verify Account Created', () => {

    cy.fixture('loginUserData').then((user) => {
      const data = user[undefined];
      cy.get("Signup / Login").click();
      cy.get("input[data-qa='signup-name']").type('Geralds');
      cy.get("input[data-qa='signup-email']").type('geralds@example.com');
      cy.get("button[data-qa='signup-button']").click();
      cy.get("input[data-qa='password']").type('TestPassword123');
      cy.get("#id_gender2").click();
      cy.get("#days").click();
      cy.get("#months").click();
      cy.get("#years").click();
      cy.get("input[data-qa='first_name']").type('Geralds');
      cy.get("input[data-qa='last_name']").type('Smith');
      cy.get("input[data-qa='company']").type('Test Company');
      cy.get("input[data-qa='address']").type('123 Test Street');
      cy.get("#country").click();
      cy.get("input[data-qa='state']").type('Karnataka');
      cy.get("input[data-qa='city']").type('Bangalore');
      cy.get("input[data-qa='zipcode']").type('560001');
      cy.get("input[data-qa='mobile_number']").type('9876543210');
      cy.get("button[data-qa='create-account']").click();
      cy.contains("Account Created!").should('be.visible');

    });
  });

});
