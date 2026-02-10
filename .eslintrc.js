module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['simple-import-sort', 'import'],
  rules: {
    // 1. Sort Imports
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // 2. Prevent relative imports where aliases exist
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../../../*'],
            message:
              'Please use path aliases (e.g., @store/, @modules/) instead of deep relative paths.',
          },
        ],
      },
    ],

    // 3. Disable rules that conflict with simple-import-sort
    'import/order': 'off',
    'sort-imports': 'off',

    // 4. General Efficiency
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    // Existing rules
    'react-native/no-inline-styles': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
