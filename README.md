# Swag Labs Automation Practice

## Description

This project is a practice automation suite built using **TypeScript** and **Playwright**. It automates interactions on the Swag Labs demo website to enhance testing and scripting skills. The suite includes tests for login functionality, product management in the shopping cart, and checkout flows.

## Features

- **Login Automation**:
  - Valid and invalid credential handling.
  - Error message validation for locked-out users.

- **Product Management**:
  - Adding and removing products from the shopping cart.
  - Verifying product details and prices.

- **Checkout Flows**:
  - Completing the checkout process with valid data.
  - Error handling for missing or invalid fields.

- **Sorting and Filtering**:
  - Sorting products by name and price.
  - Ensuring no duplicate product images.

- **Reusable Page Object Model**:
  - Modular and maintainable test structure using Page Object Model (POM).



## Technologies

- **TypeScript**: For type-safe and maintainable code.
- **Playwright**: For browser automation and end-to-end testing.
- **Node.js**: Runtime environment.
- **npm**: Dependency management.


...

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```
   git clone https://github.com/malwinaAlpha/playwright
   
   ```

2. **Install dependencies**:
   ```
   npm install

   ```
3. **Install Playwright**:
   ```
   npx playwright install

   ```

4. **Run the tests**:
   ```
   npx playwright test
   ```


4. **Run a specific test file**:
   ```
   npx playwright test tests/specs/login.practice.spec.ts
   ```
