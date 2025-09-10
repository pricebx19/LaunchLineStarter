/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Vue specific rules
    'vue/multi-word-component-names': 'off',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    
    // Enhanced unused variables detection
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        // Allow unused vars in Vue <script setup> that might be used in template
        ignoreRestSiblings: true
      }
    ],
    
    // Vue-specific unused variables
    'vue/no-unused-vars': 'error',
    'vue/no-unused-components': 'error',
    
    // General unused variables
    'no-unused-vars': 'off', // Turn off base rule in favor of TypeScript version
    
    // TypeScript specific rules
    '@typescript-eslint/no-explicit-any': 'off',
    
    // Vue 3 <script setup> compatibility
    'import/no-default-export': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    
    // General rules
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}