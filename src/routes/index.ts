import { Router } from "express";
import ImageTextSectionRoutes from "./imageWithText/index";
import ColumnSectionRoutes from "./multiColumn/index";
import GallerySectionRoutes from "./gallery/index";
import SectionListRoutes from "./sectionList/index";
const routes = Router();

routes.use("/image-with-text", ImageTextSectionRoutes);
routes.use("/column-section", ColumnSectionRoutes);
routes.use("/gallery-section", GallerySectionRoutes);
routes.use("/section-list", SectionListRoutes);

export default routes;
