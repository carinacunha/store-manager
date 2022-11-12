module.exports = {
  "globalSetup": "<rootDir>/__tests__/_globalSetup.js",
  "testSequencer": "<rootDir>/__tests__/_testSequencer.js",
  "testMatch": [
    "**/__tests__/*.test.js",
    "**/tests/unit/models/*.test.js",
    "**/tests/unit/services/*.test.js",
    "**/tests/unit/controllers/*.test.js",
  ],
  "testTimeout": 15000
}