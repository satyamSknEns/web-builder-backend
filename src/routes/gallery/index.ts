import express from "express";
import {
  createGallerySection,
  getAllGallerySections,
  getGallerySectionById,
  hardDeleteGallerySectionById,
  restoreDeletedGallerySectionById,
  softDeleteGallerySectionById,
  updateGallerySectionById,
  // getDeletedSections,
  // batchSoftDeleteSections,
  // batchRestoreDeletedSections,
} from "./controller/index";

const router = express.Router();

router.post("/", createGallerySection);
router.get("/all-sections", getAllGallerySections);
router.get("/:id", getGallerySectionById);
router.put("/update/:id", updateGallerySectionById);
router.delete("/soft-delete/:id", softDeleteGallerySectionById);
router.delete("/hard-delete/:id", hardDeleteGallerySectionById);
router.patch("/restore/:id", restoreDeletedGallerySectionById);
// router.get("/trash/list", getDeletedSections);
// router.post("/batch/delete",batchSoftDeleteSections);
// router.post("/btach/restore",batchRestoreDeletedSections);

export default router;
