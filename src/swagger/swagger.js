const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dev Connector",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4001",
      },
    ],
  },
  apis: [path.join(__dirname, "./**/*.js")], // ✅ FIX
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;