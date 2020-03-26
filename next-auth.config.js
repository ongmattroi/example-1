/** @format */

require("dotenv").config({ path: ".env" });

const nextAuthProviders = require("./next-auth.providers");
const nextAuthFunctions = require("./next-auth.functions");

// If we want to pass a custom session store then we also need to pass an
// instance of Express Session along with it.
const expressSession = require("express-session");

module.exports = () => {
  return nextAuthFunctions().then(functions => {
    return new Promise((resolve, reject) => {
      resolve({
        sessionSecret: "change-me",

        sessionMaxAge: 60000 * 60 * 24 * 7,

        sessionRevalidateAge: 60000,

        serverUrl: process.env.SERVER_URL || null,
        // Add an Express Session store.
        expressSession: expressSession,

        // Define oAuth Providers
        providers: nextAuthProviders(),

        functions: functions
      });
    });
  });
};
