// For CI/CD pipelines to generate a consolidated mochawesome report
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = path.join(__dirname, '..', 'test-results', 'mochawesome');

function listJsonFiles() {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json') && f !== 'merged.json');
}

function ensureDir() {
  fs.mkdirSync(dir, { recursive: true });
}

(function main() {
  ensureDir();
  const files = listJsonFiles();

  if (files.length === 0) {
    console.log('[report] No mochawesome JSON files to merge. Skipping report generation.');
    process.exit(0); // do not fail CI
  }

  const merged = path.join(dir, 'merged.json');
  const pattern = path.join(dir, '*.json');

  console.log('[report] Merging mochawesome JSON files...');
  execSync(`npx mochawesome-merge "${pattern}" > "${merged}"`, { stdio: 'inherit', shell: true });

  console.log('[report] Generating HTML report...');
  execSync(`npx marge "${merged}" -f report -o "${dir}"`, { stdio: 'inherit', shell: true });

  console.log('[report] Done. Report at:', path.join(dir, 'report.html'));
})();