const fs = require('fs');
const path = require('path');

const resultsDir = path.join(__dirname, '..', 'test-results', 'mochawesome');
const rootDir = path.join(__dirname, '..', 'test-results');

try {
  if (fs.existsSync(rootDir)) {
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
  fs.mkdirSync(resultsDir, { recursive: true });
  console.log('Cleaned test-results and prepared mochawesome folder.');
} catch (e) {
  console.error('Failed to prepare test-results:', e);
  process.exit(1);
}