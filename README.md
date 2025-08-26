# Cypress API CRUD Framework

It focuses on REST CRUD flows against [`reqres.in`](https://reqres.in) and includes:

- **cy.request**-based API client (GET/POST/PATCH/PUT/DELETE)
- **JSON Schema validation** with AJV
- **Unified file logging** via `cy.task('log', ...)` → `test-results/combined.log`
- **Mochawesome HTML reports**
- **GitHub Actions CI** workflow
- Simple, extensible project structure

## Quick start

```bash
# 1) Install Node 18+ (Node 20 recommended)
npm ci  # or: npm install

# 2) Run tests in headless mode
npm test

# 3) Generate the Mochawesome HTML report
npm run report

# 4) Open Cypress UI
npm run cypress:open
```

> **Base URL**  
By default we use `https://reqres.in/api`.
```bash
API_BASE_URL=https://your-api.example.com npm test
```
Or use it from `.env` file with:
```
API_BASE_URL=https://reqres.in/api
```

## Project structure

```
cypress-api-crud/
├─ cypress.config.js
├─ package.json
├─ scripts/
│  └─ pretest.js
├─ cypress/
│  ├─ e2e/
│  │  └─ api/
│  │     └─ users/
│  │        ├─ users_list_delay.cy.js
│  │        └─ users_crud.cy.js
│  ├─ fixtures/
│  │  ├─ users/
│  │  │  ├─ createUser.json
│  │  │  └─ updateUser.json
│  │  └─ schemas/
│  │     ├─ usersList.schema.json
│  │     └─ userCreateResponse.schema.json
│  └─ support/
│     ├─ e2e.js
│     ├─ commands.js
│     └─ apiClient.js
├─ test-results/
│  └─ (reports and combined logs)
└─ .github/workflows/ci.yml
```

## Extending

- Add more endpoints by creating new specs under `cypress/e2e/api/...`.
- Reuse `cy.apiGet/Post/Patch/Put/Delete` from `apiClient.js`.
- Validate responses by placing JSON Schemas under `cypress/fixtures/schemas` and calling `cy.validateSchema(schema, response.body)`.

## GitHub Actions

A ready-to-use CI workflow runs tests and uploads HTML reports and logs as artifacts.