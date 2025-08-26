/// <reference types="cypress" />

/**
 * API client helper commands for Cypress.
 *
 * Features:
 * - Uses baseUrl from cypress.config.js + optional env API_PREFIX.
 * - Automatically attaches Authorization: Bearer ${API_TOKEN} if set.
 * - Supports X-API-KEY from env (API_KEY) if needed.
 * - Sets JSON-friendly defaults (Accept/Content-Type) unless you override them.
 * - Allows per-call header overrides via the 3rd parameter.
 * - Does not fail test on non-2xx by default (failOnStatusCode: false).
 */

function joinUrl(base, prefix, path) {
  const seg = (...parts) =>
    parts
      .filter(Boolean)
      .map(p => String(p).replace(/(^\/+|\/+$)/g, ''))
      .join('/');
  const joined = seg(base, prefix, path);
  // Preserve leading protocol (https://) from baseUrl; Cypress handles it
  return base.endsWith('/') || joined.startsWith('http') ? `${base.replace(/\/+$/, '')}/${seg(prefix, path)}` : `${base}/${seg(prefix, path)}`;
}

function buildUrl(path) {
  const base = Cypress.config('baseUrl') || '';
  const apiPrefix = Cypress.env('API_PREFIX') || '';
  // If path already includes full URL, return it unchanged
  if (/^https?:\/\//i.test(path)) return path;
  return joinUrl(base, apiPrefix, path);
}

function getDefaultHeaders(customHeaders = {}) {
  const apiKey = Cypress.env('API_KEY');

  const defaults = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (apiKey && !customHeaders['x-api-key']) {
    defaults['x-api-key'] = apiKey;   // 👈 inject your header
  }}

Cypress.Commands.add('apiGet', (path, qs = undefined, headers = {}) => {
  return cy.request({
    method: 'GET',
    url: buildUrl(path),
    qs,
    headers: getDefaultHeaders(headers),
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiPost', (path, body = {}, headers = {}) => {
  return cy.request({
    method: 'POST',
    url: buildUrl(path),
    body,
    headers: getDefaultHeaders(headers),
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiPatch', (path, body = {}, headers = {}) => {
  return cy.request({
    method: 'PATCH',
    url: buildUrl(path),
    body,
    headers: getDefaultHeaders(headers),
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiPut', (path, body = {}, headers = {}) => {
  return cy.request({
    method: 'PUT',
    url: buildUrl(path),
    body,
    headers: getDefaultHeaders(headers),
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiDelete', (path, headers = {}) => {
  return cy.request({
    method: 'DELETE',
    url: buildUrl(path),
    headers: getDefaultHeaders(headers),
    failOnStatusCode: false,
  });
});