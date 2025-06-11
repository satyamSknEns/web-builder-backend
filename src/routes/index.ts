import { Router } from "express";
import ImageWithTextRoutes from "./imageWithText/index";
import MultiColumnRoutes from "./multiColumn/index";
const routes = Router();

routes.use("/image-with-text", ImageWithTextRoutes);
routes.use("/multi-column", MultiColumnRoutes);

export default routes;
