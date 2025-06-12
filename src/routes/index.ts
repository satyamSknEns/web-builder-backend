import { Router } from "express";
import ImageTextSectionRoutes from "./imageWithText/index";
import ColumnSectionRoutes from "./multiColumn/index";
import GallerySection from "./gallery/index";
const routes = Router();

routes.use("/image-with-text", ImageTextSectionRoutes);
routes.use("/column-section", ColumnSectionRoutes);
routes.use("/gallery-section", GallerySection);

export default routes;
