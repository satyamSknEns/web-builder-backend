import { Router } from "express";
import ImageWithTextRoutes from "./imageWithText/index";
const routes = Router();

routes.use("/image-with-text", ImageWithTextRoutes);

export default routes;
