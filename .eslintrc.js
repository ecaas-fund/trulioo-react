module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: [
    'react',
  ],
  rules: {
    "linebreak-style": 0,
    "import/no-cycle": 0,
    "jsx-a11y/label-has-for": 0,
    'no-console': 'off',
    "max-len": ["error", { "code": 130 }],
  },
};
