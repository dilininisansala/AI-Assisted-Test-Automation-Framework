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
## My Approach to AI-Assisted Testing ## 
Instead of relying only on traditional scripting, I introduced a simple but effective AI-assisted workflow.
I used Claude / Copilot in the browser (manual prompt + copy-paste approach) to convert test scenarios into structured JSON.

### Prompt Engineering for Test Generation ###
Here’s the exact prompt pattern I used to generate consistent test steps:
```
Convert this into JSON test steps for test generator.

Only use these actions:
visit, type, click, assertUrl, assertText

Do not use:
get, assertion, target

Follow this exact format:
{
  "testName": "...",
  "steps": [
    { "action": "visit", "url": "..." },
    { "action": "type", "selector": "...", "value": "..." },
    { "action": "click", "selector": "..." },
    { "action": "assertUrl", "value": "..." },
    { "action": "assertText", "value": "..." }
  ]
}

Scenario:
<your test case>
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
Using Copilot and Claude, I was able to:<br>
* Use Claude / Copilot to convert it into JSON
* Quickly design structured JSON test formats
* Generate repetitive Cypress commands efficiently
* Refactor test logic into reusable patterns
* Improve readability and reduce manual effort

## Why It Matters ## 
✅ Maintainability: JSON definitions are cleaner and easier to update than raw Cypress scripts.<br>
✅ Scalability: Each product flow can live in its own JSON file, or be combined into a suite.<br>
✅ CI/CD Friendly: Modular tests can run independently or in parallel.<br>
✅ AI Assistance: AI helped me design, debug, and structure these flows faster than manual trial‑and‑error.
