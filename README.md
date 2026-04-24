# AI-Assisted-Test-Automation-Framework
Testing automation is evolving fast. I explored how AI tools like Microsoft Copilot and Claude can accelerate the process. Instead of writing long Cypress scripts by hand, I experimented with AI‑assisted test generation — converting scenarios into JSON definitions and letting a generator script produce Cypress tests automatically.
This approach made my workflow faster, modular, and easier to maintain.

## What I Did ## 
✅ Started with Cypress scripts for product flows: signup, Login, search & add to cart, single product checkout, multiple products checkout, and empty cart checkout.<br>
✅ Converted these scripts into JSON-based test definitions using strict, reusable actions <br>
* visit
* type
* click
* assertUrl
* assertText<br>
✅ Built a generator script (generateTest.js) that parses JSON and outputs Cypress .cy.js files.<br>
✅ Generated modular test scripts inside<br>
```
cypress/e2e/generated
```

## How to Execute the Framework ## 
To keep things simple and reproducible, I structured the execution into two steps:

### ▶️ Generate Test Scripts from JSON ### 
```
node generator/generateTest.js login.json
```
This command reads the JSON test definition and dynamically generates a Cypress test file inside:
```
cypress/e2e/generated/
```

### ▶️ Run Cypress Tests ### 
This launches the Cypress Test Runner, where you can execute the generated test cases.
```
npx cypress open
```

## Where AI Helped ## 
* Using Copilot and Claude, I was able to:
* Quickly design structured JSON test formats
* Generate repetitive Cypress commands efficiently
* Refactor test logic into reusable patterns
* Improve readability and reduce manual effort

## Why It Matters ## 
✅ Maintainability: JSON definitions are cleaner and easier to update than raw Cypress scripts.<br>
✅ Scalability: Each product flow can live in its own JSON file, or be combined into a suite.<br>
✅ CI/CD Friendly: Modular tests can run independently or in parallel.<br>
✅ AI Assistance: AI helped me design, debug, and structure these flows faster than manual trial‑and‑error.
