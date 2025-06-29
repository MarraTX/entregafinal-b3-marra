import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Adoptme",
      version: "1.0.0",
      description:
        "API-Rest Adoptme con Swagger, Mongoose y Passport. Se recomienda hacer un inicio de sesión para acceder a las rutas protegidas.",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Ingrese el token JWT en el formato: Bearer <token>",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:8080",
        description: "Testing",
      },
      {
        url: "http://localhost:8080",
        description: "Desarrollo",
      },
      {
        url: "http://localhost:8080",
        description: "Producción",
      },
    ],
  },
  apis: [path.resolve("src/docs/**/*.yaml")],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
