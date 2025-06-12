import express from "express";
import {
  createSection,
  getAllSections,
  getDeletedSections,
  getSectionById,
  restoreDeletedSectionById,
  softDeleteSectionById,
  updateSectionById,
  // batchSoftDeleteSections,
  // batchRestoreDeletedSections,
} from "./controller/index";

const router = express.Router();

router.post("/", createSection);
router.get("/all-sections", getAllSections);
router.get("/:id", getSectionById);
router.put("/update/:id", updateSectionById);
router.delete("/delete/:id", softDeleteSectionById);
router.get("/trash/list", getDeletedSections);
router.get("/deleted/all-section", getDeletedSections);
router.get("/restore/:id", restoreDeletedSectionById);
// router.post("/batch/delete",batchSoftDeleteSections);
// router.post("/btach/restore",batchRestoreDeletedSections);

export default router;
