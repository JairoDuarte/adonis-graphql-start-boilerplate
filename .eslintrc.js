module.exports = {
  env: {
    node: true,
    jest: true
  },
  extends: ['airbnb-base', 'prettier', 'plugin:jest/recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'jest'],
  rules: {
    'no-underscore-dangle': 'off',
    'import/no-unresolved': 'off',
    'prettier/prettier': ['error']
  },
  globals: {
    use: true
  }
};
