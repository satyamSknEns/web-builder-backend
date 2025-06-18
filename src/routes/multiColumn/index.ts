import express from "express";
import {
  createColumnSection,
  getAllColumnSections,
  getColumnSectionById,
  updateColumnSectionById,
  softDeleteColumnSectionById,
  // getDeletedColumnSections,
  restoreDeletedColumnSectionById,
  hardDeleteColumnSectionById,
} from "./controller";

const router = express.Router();

router.post("/", createColumnSection);
router.get("/all-sections", getAllColumnSections);
router.get("/:id", getColumnSectionById);
router.put("/update/:id", updateColumnSectionById);
router.delete("/soft-delete/:id", softDeleteColumnSectionById);
router.delete("/hard-delete/:id", hardDeleteColumnSectionById);
// router.get("/trash/list", getDeletedColumnSections);
router.patch("/restore/:id", restoreDeletedColumnSectionById);
export default router;
