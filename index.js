/** @format */

"use strict";

const next = require("next");
const nextAuth = require("next-auth");
const nextAuthConfig = require("./next-auth.config");

const nextI18NextMiddleware = require("next-i18next/middleware").default;
const nextI18next = require("./i18n");

// Load environment variables from .env file if present
require("dotenv").config({ path: ".env" });

process.on("uncaughtException", function(err) {
  console.error("Uncaught Exception: ", err);
});

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection: Promise:", p, "Reason:", reason);
});

// Default when run with `npm start` is 'production' and default port is '80'
// `npm run dev` defaults mode to 'development' & port to '3000'
process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.env.PORT = process.env.PORT || 80;

// Initialize Next.js
const nextApp = next({
  dir: ".",
  dev: process.env.NODE_ENV === "development"
});

// Add next-auth to next app
(async () => {
  try {
    await nextApp.prepare();
    const nextAuOp = await nextAuthConfig();
    const nextAuOps = await nextAuth(nextApp, nextAuOp);
    const express = nextAuOps.express;
    const expressApp = nextAuOps.expressApp;
    expressApp.use(
      "/fonts/ionicons",
      express.static("./node_modules/ionicons/dist/fonts")
    );
    await nextI18next.initPromise;
    expressApp.use(nextI18NextMiddleware(nextI18next));
    expressApp.get("/custom-route/:id", (req, res) => {
      // Note: To make capturing a slug easier when rendering both client
      // and server side, name it ':id'
      return nextApp.render(req, res, "/examples/routing", req.params);
    });

    // Default catch-all handler to allow Next.js to handle all other routes
    expressApp.all("*", (req, res) => {
      let nextRequestHandler = nextApp.getRequestHandler();
      return nextRequestHandler(req, res);
    });

    expressApp.listen(process.env.PORT, err => {
      if (err) {
        throw err;
      }
      console.log(
        "> Ready on http://localhost:" +
          process.env.PORT +
          " [" +
          process.env.NODE_ENV +
          "]"
      );
    });
    // nextApp
    //   .prepare()
    //   .then(() => {
    //     // Load configuration and return config object
    //     return nextAuthConfig();
    //   })
    //   .then(nextAuthOptions => {
    //     // Pass Next.js App instance and NextAuth options to NextAuth
    //     // Note We do not pass a port in nextAuthOptions, because we want to add some
    //     // additional routes before Express starts (if you do pass a port, NextAuth
    //     // tells NextApp to handle default routing and starts Express automatically).
    //     return nextAuth(nextApp, nextAuthOptions);
    //   })
    //   .then(nextAuthOptions => {
    //     // Get Express and instance of Express from NextAuth
    //     const express = nextAuthOptions.express;
    //     const expressApp = nextAuthOptions.expressApp;

    //     // Serve fonts from ionicon npm module
    //     expressApp.use(
    //       "/fonts/ionicons",
    //       express.static("./node_modules/ionicons/dist/fonts")
    //     );
    //     await nextI18next.initPromise
    //     expressApp.use(nextI18NextMiddleware(nextI18next))

    //     // A simple example of custom routing
    //     // Send requests for '/custom-route/{anything}' to 'pages/examples/routing.js'
    //     expressApp.get("/custom-route/:id", (req, res) => {
    //       // Note: To make capturing a slug easier when rendering both client
    //       // and server side, name it ':id'
    //       return nextApp.render(req, res, "/examples/routing", req.params);
    //     });

    //     // Default catch-all handler to allow Next.js to handle all other routes
    //     expressApp.all("*", (req, res) => {
    //       let nextRequestHandler = nextApp.getRequestHandler();
    //       return nextRequestHandler(req, res);
    //     });

    //     expressApp.listen(process.env.PORT, err => {
    //       if (err) {
    //         throw err;
    //       }
    //       console.log(
    //         "> Ready on http://localhost:" +
    //           process.env.PORT +
    //           " [" +
    //           process.env.NODE_ENV +
    //           "]"
    //       );
    //     });
    //   })
    //   .catch(err => {
    //     console.log("An error occurred, unable to start the server");
    //     console.log(err);
    //   });
  } catch (err) {
    console.log("An error occurred, unable to start the server");
    console.log(err);
  }
})();
