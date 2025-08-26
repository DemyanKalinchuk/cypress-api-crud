/// <reference types="cypress" />

describe('Users API - CRUD flow', () => {
  it('POST /users creates a user (201)', () => {
    cy.fixture('users/createUser.json').then((payload) => {
      cy.apiPost('/users', payload).then((resp) => {
        cy.logToFile(`POST /users -> ${resp.status}`);
        cy.expectStatus(resp, 201);
        cy.fixture('schemas/userCreateResponse.schema.json').then((schema) => {
          cy.validateSchema(schema, resp.body);
        });
        expect(resp.body).to.have.property('name', payload.name);
        expect(resp.body).to.have.property('job', payload.job);
      });
    });
  });

  it('PATCH /users/2 updates a user (200)', () => {
    cy.fixture('users/updateUser.json').then((payload) => {
      cy.apiPatch('/users/2', payload).then((resp) => {
        cy.logToFile(`PATCH /users/2 -> ${resp.status}`);
        cy.expectStatus(resp, 200);
        expect(resp.body).to.have.property('job', payload.job);
        expect(resp.body).to.have.property('updatedAt');
      });
    });
  });

  it('PUT /users/2 replaces user data (200)', () => {
    cy.apiPut('/users/2', { name: 'morpheus', job: 'zion resident' }).then((resp) => {
      cy.logToFile(`PUT /users/2 -> ${resp.status}`);
      cy.expectStatus(resp, 200);
      expect(resp.body).to.have.property('name', 'morpheus');
      expect(resp.body).to.have.property('job', 'zion resident');
      expect(resp.body).to.have.property('updatedAt');
    });
  });

  it('DELETE /users/2 removes a user (204)', () => {
    cy.apiDelete('/users/2').then((resp) => {
      cy.logToFile(`DELETE /users/2 -> ${resp.status}`);
      cy.expectStatus(resp, 204);
    });
  });

  it('GET /users/23 returns 404 for missing user', () => {
    cy.apiGet('/users/23').then((resp) => {
      cy.logToFile(`GET /users/23 -> ${resp.status}`);
      cy.expectStatus(resp, 404);
    });
  });
});