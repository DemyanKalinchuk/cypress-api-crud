/// <reference types="cypress" />

describe('Users API - list with delay', () => {
  it('GET /users?delay=3 returns a valid list', () => {
    cy.apiGet('/users', { delay: 3 }).then((resp) => {
      cy.logToFile(`GET /users?delay=3 -> ${resp.status}`);
      cy.expectStatus(resp, 200);
      cy.fixture('schemas/usersList.schema.json').then((schema) => {
        cy.validateSchema(schema, resp.body);
      });
      // Basic sanity checks
      expect(resp.body).to.have.property('data').and.to.be.an('array');
    });
  });
});