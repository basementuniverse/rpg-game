module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.json'
    ],
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowExpressions": true
      }
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "no-return-await": "error",
    "curly": "warn",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/typedef": [
      "warn",
      {
        "arrowParameter": false,
        "variableDeclaration": false,
        "memberVariableDeclaration": true,
        "propertyDeclaration": true
      }
    ],
    "@typescript-eslint/no-empty-function": "off"
  }
};
