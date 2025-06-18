import express from "express";
import {
  createImageText,
  getAllImageTextSections,
  getImageTextSectionById,
  updateImageTextSectionById,
  softDeleteImageTextSectionById,
  restoreDeletedImageTextSectionById,
  hardDeleteImageTextSectionById,
} from "./controller/index";

const router = express.Router();

router.post("/", createImageText); 
router.get("/all-sections", getAllImageTextSections); 
router.get("/:id", getImageTextSectionById); 
router.put("/update/:id", updateImageTextSectionById); 
router.delete("/soft-delete/:id", softDeleteImageTextSectionById); 
router.delete("/hard-delete/:id", hardDeleteImageTextSectionById); 
router.patch("/restore/:id", restoreDeletedImageTextSectionById);

export default router;
