/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require("path");
module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: [
          path.resolve(__dirname, "tsconfig.json"), // root tsconfig
        ],
      },
      node: {
        paths: ["node_modules", "src", "export/types/"],
        extensions: [".js", ".jsx", ".ts", ".d.ts", ".tsx"],
        moduleDirectory: ["node_modules", "src", "export/types/"],
      },
    },
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "standard",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "node/no-unsupported-features/es-syntax": ["error", { ignores: ["modules"] }],
    "no-unused-expressions": ["off", { files: ["*.test.js", "*.spec.js"] }],
    "node/no-unpublished-import": [
      "error",
      {
        allowModules: ["hardhat", "hardhat-deploy"],
      },
    ],
    "node/no-missing-import": ["off"],
  },
};
