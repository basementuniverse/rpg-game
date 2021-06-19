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
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    'curly': 'warn',
    'no-return-await': 'warn',
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
    ],
  },
};
