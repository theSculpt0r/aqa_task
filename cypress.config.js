const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    password: 'password123'
  },
  watchForFileChanges: false,
  e2e: {

    baseUrl: 'http://ec2-63-32-106-55.eu-west-1.compute.amazonaws.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
