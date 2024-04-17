/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    node: true, // 只需将该项设置为 true 即可
  },
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
