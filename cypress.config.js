const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

// Load .env if present
try {
  require('dotenv').config();
} catch (e) {}

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.API_BASE_URL || 'https://reqres.in/api',
    extraHTTPHeaders: (() => {
      const headers = { 'Accept-Language': process.env.ACCEPT_LANGUAGE ?? 'en-US' };
      const authToken = {'x-api-key': process.env.AUTH_TOKEN ?? 'reqres-free-v1'};

      if (process.env.AUTH_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.AUTH_TOKEN}`;
      }
      if (process.env.API_KEY) {
        headers['x-api-key'] = process.env.API_KEY;
      } else {
        headers['x-api-key'] = authToken['x-api-key'];
      }
      return headers;
    })(),
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        log(message) {
          const dir = path.join('test-results');
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          const file = path.join(dir, 'combined.log');
          const line = `[${new Date().toISOString()}] ${message}\n`;
          try {
            fs.appendFileSync(file, line);
          } catch (e) {
            console.error('Failed to append log:', e);
          }
          return null;
        }
      });
      return config;
    },
  },
  video: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'test-results/mochawesome',
    reportFilename: 'report',
    charts: true,
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true
  },
  env: {
    API_PREFIX: '',
    API_KEY: "reqres-free-v1"   // 👈 general token
  }
});