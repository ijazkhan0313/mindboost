module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config',
    '@nuxtjs/eslint-config-typescript',
    'plugin:jsonc/recommended-with-jsonc'
  ],
  ignorePatterns: ['assets/', '**/*.svg', '**/*.png', '**/*.md']
}
