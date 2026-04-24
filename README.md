# AI-Assisted-Test-Automation-Framework
I explored how AI tools like <b>Microsoft Copilot</b> and <b>Claude</b> can accelerate the process. Instead of writing long Cypress scripts by hand, I experimented with AI‑assisted test generation - converting scenarios into <b>JSON definitions</b> and letting a generator script produce Cypress tests automatically. This approach made my workflow faster, modular, and easier to maintain.

<b> Test Application Used: https://automationexercise.com/ </b> 

## What I Did ## 
✅ Started with Cypress scripts for product flows:<br> 
* Signup
* Login
* Search & add to cart
* Single product checkout
* Multiple products checkout
* Empty cart checkout<br>

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
  "suiteName": "...",
  "tests": [
    {
      "name": "...",
      "steps": [
        { "action": "visit", "url": "..." },
        { "action": "type", "selector": "...", "value": "..." },
        { "action": "click", "selector": "..." },
        { "action": "assertUrl", "value": "..." },
        { "action": "assertText", "value": "..." }
      ]
    }
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

## Project Walkthrough (with Screenshots) ## 
### Project File Structure ###
Structured project layout with Cypress, JSON test definitions, and a custom test generator.
<img width="1917" height="991" alt="image" src="https://github.com/user-attachments/assets/cea1e2c3-5fc9-427a-8fff-e99b630a6f84" />

### Generator Script (generateTest.js) ### 
Custom Node.js generator that converts JSON test steps into executable Cypress test scripts.
<img width="1917" height="1017" alt="image" src="https://github.com/user-attachments/assets/a5fc5e76-b90e-4b50-865c-dba4b55a71db" />
```
const fs = require('fs');

// Get file name from command line
const fileName = process.argv[2];

if (!fileName) {
  console.error('❌ Please provide a JSON file name');
  console.log('👉 Example: node generator/generateTest.js login.json');
  process.exit(1);
}

// Read JSON from correct folder
const filePath = `./generator/tests/${fileName}`;

if (!fs.existsSync(filePath)) {
  console.error(`❌ File not found: ${filePath}`);
  process.exit(1);
}

const testData = JSON.parse(
  fs.readFileSync(filePath, 'utf-8')
);

// Start building test code
let testCode = `
describe('${testData.suiteName}', () => {

  beforeEach(() => {
    cy.visit('/');    
  });
`;

// Loop tests
testData.tests.forEach(test => {

  testCode += `
  it('${test.name}', () => {

    cy.fixture('loginUserData').then((user) => {
      const data = user[${JSON.stringify(test.dataKey)}];
`;

  // Loop steps
  test.steps.forEach(step => {

    switch(step.action) {

      case 'visit':
        break;

      case 'clickText':
        if (!step.value) {
          throw new Error('clickText requires "value"');
        }
        testCode += `      cy.contains(${JSON.stringify(step.value)}).click();\n`;
        break;

      case 'click':
        testCode += `      cy.get(${JSON.stringify(step.selector)}).click();\n`;
        break;

      case 'type':
        if (step.fixture) {
          testCode += `      cy.get(${JSON.stringify(step.selector)}).type(data.${step.fixture});\n`;
        } else {
          testCode += `      cy.get(${JSON.stringify(step.selector)}).type('${step.value}');\n`;
        }
        break;

      case 'assertText':
        testCode += `      cy.contains(${JSON.stringify(step.value)}).should('be.visible');\n`;
        break;

      default:
        console.warn(`⚠️ Unknown action: ${step.action}`);
    }

  });

  testCode += `
    });
  });
`;

});

// Close describe
testCode += `
});
`;

// Dynamic output file name
const outputFileName = fileName.replace('.json', '.generated.cy.js');

// Write to correct folder
fs.writeFileSync(
  `./cypress/e2e/generated/${outputFileName}`,
  testCode
);

console.log(`✅ Test generated: ${outputFileName}`);
```
### Generated Test Example ###
Example of an auto-generated Cypress test created from structured JSON input.
```
cypress/e2e/generated/login.generated.cy.js
```
<img width="1918" height="1017" alt="image" src="https://github.com/user-attachments/assets/ad1c76ae-73e7-4caf-94f8-b2aaab6615ea" />

### Generator Mapping Rule ### 
The generator should use:
* <b>suiteName</b>  for the <b>describe()</b>  block 
* <b>name</b> for the <b>it()</b> block
  
If this mapping isn’t correct, your generated file will show:
```
it('undefined', () => {
  // ...
});

```
This happens because the script is trying to read a property that doesn’t exist, such as test.test_title or test.testName when your JSON actually uses name
Generated Cypress test:
```
describe('Product Checkout Flows', () => {
  it('Product Search & Add to Cart', () => {
    // steps...
  });
});
```
## Why It Matters ## 
✅ Maintainability: JSON definitions are cleaner and easier to update than raw Cypress scripts.<br>
✅ Scalability: Each product flow can live in its own JSON file, or be combined into a suite.<br>
✅ CI/CD Friendly: Modular tests can run independently or in parallel.<br>
✅ AI Assistance: AI helped me design, debug, and structure these flows faster than manual trial‑and‑error.

## 📌 Special Notes on JSON Test Definitions ##
💡<b>Consistency in Keys</b><br> 
Always align JSON keys with what your generator expects.
Example: use "suiteName" for describe() and "name" (or "testName") for it().

💡<b>Strict Action Constraints</b> <br>
Limit actions to: <br>
🔹visit<br>
🔹type<br>
🔹click<br>
🔹assertUrl<br> 
🔹assertText<br>
Avoid unsupported actions like get, assertion, or target to keep definitions clean and predictable.

💡<b>Readable Suite Names</b> <br>
Use descriptive suiteName values such as <b>"Product Checkout Flows"</b> or <b>"Signup Functionality"</b>. This makes generated tests easier to organize and understand.

💡<b>Scenario‑Driven Test Names</b> <br>
Each test should have a clear <b>"name"</b> (or <b>"testName"</b>) that describes the scenario:<br>
🔹Empty Cart Checkout<br>
🔹Single Product Checkout<br>
🔹Product Search & Add to Cart

💡<b>Fixture Integration</b> <br>
You can reference test data via "fixture" keys (e.g., data.email, data.password) for reusable credentials. This keeps JSON definitions lightweight and avoids hardcoding sensitive values.

💡<b>Modularity vs. Combined Suites</b><br> 
🔹Separate JSON files per scenario = modular, CI/CD friendly.<br>
🔹Combined JSON suite = easier to see the big picture.

