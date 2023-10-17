import express from "express";
import userController from "../controller/user-controller.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "../api-documents/swagger.js";

const specs = swaggerJsdoc(options);
const publicRouter = new express.Router();

publicRouter.use("/api-docs", swaggerUi.serve);
publicRouter.get("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);

export { publicRouter };
