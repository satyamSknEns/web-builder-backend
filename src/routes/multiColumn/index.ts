import express from "express";
import {
  createColumnSection,
  deleteSectionById,
  getAllSections,
  getSectionById,
  updateSectionById
} from "./controller";

const router = express.Router();

router.post("/", createColumnSection);
router.get("/all-sections", getAllSections);
router.get("/:id", getSectionById);
router.put("/update/:id", updateSectionById);
router.delete("/delete/:id", deleteSectionById);
export default router;
