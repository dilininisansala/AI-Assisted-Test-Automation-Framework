# AI-Assisted Test Automation Framework
This project demonstrates a data-driven, AI-assisted test automation framework using Cypress.Instead of writing test scripts manually, test scenarios are defined in JSON format, and a custom test generator engine dynamically converts them into executable Cypress test scripts.

This project contains automated tests for:<br>
✅ Signup Flow<br>
✅ Login Flow<br>
✅ Product Search & Add to Cart<br>
✅ Single Product Checkout (without payment)<br>
✅ Multiple Products Checkout (without payment)<br>
✅ Empty Cart Checkout<br>
✅ Dynamic Cart Operations

## Key Features
✅ JSON-based test case definition<br>
✅ Dynamic test generation using Node.js<br>
✅ Reusable and scalable test architecture<br>
✅ Separation of manual and generated tests<br>
✅ Supports multiple application flows (Login, Signup, Product, etc.)<br>
✅ Easily extendable for AI-based test generation

## Architecture
```
Test Definition (JSON) → Test Generator (Node.js) → Cypress Execution
```

### Layers:
✅ Test Definition Layer<br>
*   JSON files define test steps and data<br>

✅ Test Generator Layer<br>
*   Converts JSON into Cypress test scripts<br>

✅ Execution Layer<br>
*   Cypress runs generated tests

## Future Enhancements
✅ AI-based test case generation (Prompt → JSON)<br>
✅ Integration with CI/CD (Jenkins, GitHub Actions)<br>
✅ Advanced actions (API testing, validations)<br>
✅ Test reporting dashboards

## Running Tests
### Run the generator
```
node generator/generateTest.js login.json
node generator/generateTest.js signup.json
```
### Generated test will be created
```
cypress/e2e/generated/login.generated.cy.js
```
### Run Cypress
```
npx cypress open
```


## CI/CD
The project uses GitHub Actions for continuous integration. The workflow configuration can be found in .github/workflows/cypress.yml

## Conclusion
This project demonstrates how AI-assisted testing can transform traditional automation into a scalable, intelligent, and maintainable system.
