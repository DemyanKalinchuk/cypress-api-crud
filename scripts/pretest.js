const fs = require('fs');
const path = require('path');

const mochawesomeDir = path.join(__dirname, '..', 'test-results', 'mochawesome');
const rootDir = path.join(__dirname, '..', 'test-results');

try {
  if (fs.existsSync(rootDir)) fs.rmSync(rootDir, { recursive: true, force: true });
  fs.mkdirSync(mochawesomeDir, { recursive: true });
  console.log('Prepared test-results/mochawesome.');
} catch (e) {
  console.error('Failed to prepare test-results:', e);
  process.exit(1);
}