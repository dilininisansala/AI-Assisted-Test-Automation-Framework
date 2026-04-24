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