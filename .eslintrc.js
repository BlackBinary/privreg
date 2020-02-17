const { resolve } = require('path');

module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ["@root", "./"],
          ["@jobs", resolve("src/jobs")],
          ["@models", resolve("src/models")],
          ["@helpers", resolve("src/helpers")],
          ["@database", resolve("src/database")],
          ["@middleware", resolve("src/middleware")],
          ["@controllers", resolve("src/controllers")],
          ["@repositories", resolve("src/repositories")],
          ["@notifications", resolve("src/notifications")],
        ],
      }
    }
  },
};
