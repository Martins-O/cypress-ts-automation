# Cypress TypeScript API Test Suite

Automated API test suite for [Restful Booker](https://restful-booker.herokuapp.com) built with Cypress and TypeScript.

## Tech Stack
- Cypress 15
- TypeScript
- GitHub Actions CI

## Test Coverage

### Auth Tests (`auth.cy.ts`)
- Valid credential token generation
- Invalid username rejection
- Invalid password rejection
- Empty body rejection

### Booking Tests (`booking.cy.ts`)
- Get all bookings
- Create a booking
- Get booking by ID
- Full update (PUT)
- Partial update (PATCH)
- Delete a booking
- Verify deletion returns 404

## Test Strategy
Tests target the API layer directly using `cy.request()` rather than UI interactions. This approach validates contract correctness, status codes, and response payloads — covering the full CRUD lifecycle with authenticated and unauthenticated scenarios.

## Running Locally

```bash
npm install
npx cypress run
```

## CI
Tests run automatically on every push and pull request via GitHub Actions.