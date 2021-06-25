module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.json',
    ],
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    'curly': 'warn',
    'no-return-await': 'warn',
    'semi': 'off',
    '@typescript-eslint/semi': ['error'],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': [
      'warn',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'enums': 'always-multiline',
        'generics': 'always-multiline',
        'tuples': 'always-multiline',
        'functions': 'never',
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': 'warn',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        'allowExpressions': true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/typedef': [
      'warn',
      {
        'arrowParameter': false,
        'variableDeclaration': false,
        'memberVariableDeclaration': true,
        'propertyDeclaration': true,
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/quotes': [
      'warn',
      'single',
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true,
      },
    ],
    'sort-imports': 'off',
    'simple-import-sort/imports': [
      'warn',
      {
        'groups': [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']],
      },
    ],
    'simple-import-sort/exports': 'warn',
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'error',
  },
};
