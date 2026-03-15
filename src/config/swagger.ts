import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PLP API",
      version: "1.0.0",
      description: "API documentation for Peace Love Proclaimers project",
    },

    servers: [
      { url: "http://localhost:9000/api", description: "Local server" },
      {
        url: "https://plp-bn.onrender.com/api",
        description: "Production server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export default specs;