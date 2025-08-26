/// <reference types="cypress" />
import './apiClient';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, strict: false });

Cypress.Commands.add('expectStatus', (resp, expected) => {
  expect(resp.status, `status should be ${expected}`).to.eq(expected);
});

Cypress.Commands.add('validateSchema', (schema, data) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    const errors = JSON.stringify(validate.errors, null, 2);
    throw new Error(`Schema validation failed:\n${errors}`);
  }
});

Cypress.Commands.add('logToFile', (message) => {
  cy.task('log', message);
});