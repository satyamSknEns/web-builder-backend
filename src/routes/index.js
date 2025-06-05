import { Router } from "express";
import userRoutes from "./user/index.js";
import ImageWithTextRoutes from "./imageWithText/index.js";
const routes = Router();

// routes.use("/user", userRoutes);
routes.use("/image-with-text", ImageWithTextRoutes);

export default routes;
