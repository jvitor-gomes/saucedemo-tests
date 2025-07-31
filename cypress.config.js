const { defineConfig } = require("cypress");
const fs = require('fs');

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
      });
    },
  },
});
