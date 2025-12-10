export default {
  // TypeScript and JavaScript files
  '**/*.{js,jsx,ts,tsx}': [
    'eslint --fix --max-warnings=0 --no-warn-ignored',
    'prettier --write',
  ],

  // JSON files
  '**/*.json': ['prettier --write'],

  // Markdown files
  '**/*.md': ['prettier --write'],

  // CSS and style files
  '**/*.{css,scss,sass}': ['prettier --write'],
}
