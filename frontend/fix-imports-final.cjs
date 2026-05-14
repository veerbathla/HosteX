const fs = require('fs');
const path = require('path');
const SRC = path.resolve(__dirname, 'src');

function fix(filePath, replacements) {
  const abs = path.resolve(SRC, filePath);
  if (!fs.existsSync(abs)) { console.log(`⚠ SKIP (not found): ${filePath}`); return; }
  let content = fs.readFileSync(abs, 'utf-8');
  let changed = false;
  for (const [from, to] of replacements) {
    if (content.includes(from)) { content = content.split(from).join(to); changed = true; }
  }
  if (changed) { fs.writeFileSync(abs, content, 'utf-8'); console.log(`✓ ${filePath}`); }
  else { console.log(`· ${filePath} (no changes needed)`); }
}

fix('modules/public/pages/Landing.jsx', [
  ['"../components/landing/Navbar"', '"@/modules/public/components/Navbar"'],
  ['"../components/landing/Hero"', '"@/modules/public/components/Hero"'],
  ['"../components/landing/Features"', '"@/modules/public/components/Features"'],
  ['"../components/landing/Process"', '"@/modules/public/components/Process"'],
  ['"../components/landing/CTA"', '"@/modules/public/components/CTA"'],
  ['"../components/landing/Footer"', '"@/modules/public/components/Footer"'],
]);

fix('modules/public/components/Navbar.jsx', [
  ['"../ui/Button"', '"@/components/ui/Button"'],
]);

fix('modules/public/components/Hero.jsx', [
  ['"../ui/Button"', '"@/components/ui/Button"'],
  ['"../ui/Card"', '"@/components/ui/Card"'],
  ['"../ui/Badge"', '"@/components/ui/Badge"'],
]);

fix('modules/public/components/Features.jsx', [
  ['"../ui/Card"', '"@/components/ui/Card"'],
]);

fix('modules/public/components/CTA.jsx', [
  ['"../ui/Button"', '"@/components/ui/Button"'],
]);

fix('components/feedback/ErrorBoundary.jsx', [
  ['"../ui/Button"', '"@/components/ui/Button"'],
  ['"../ui/Card"', '"@/components/ui/Card"'],
]);

console.log('✅ Final clean up done');
