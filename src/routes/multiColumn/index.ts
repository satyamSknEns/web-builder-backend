import express from "express";
import {
  createColumnSection,
  getAllColumnSections,
  getColumnSectionById,
  updateColumnSectionById,
  softDeleteColumnSectionById,
  // getDeletedColumnSections,
  restoreDeletedColumnSectionById,
} from "./controller";

const router = express.Router();

router.post("/", createColumnSection);
router.get("/all-sections", getAllColumnSections);
router.get("/:id", getColumnSectionById);
router.put("/update/:id", updateColumnSectionById);
router.delete("/delete/:id", softDeleteColumnSectionById);
// router.get("/trash/list", getDeletedColumnSections);
router.patch("/restore/:id", restoreDeletedColumnSectionById);
export default router;
