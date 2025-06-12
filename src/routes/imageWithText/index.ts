import express from "express";
import {
  createImageText,
  getAllImageTextSections,
  getImageTextSectionById,
  updateImageTextSectionById,
  softDeleteImageTextSectionById,
  restoreDeletedImageTextSectionById,
} from "./controller/index";

const router = express.Router();

router.post("/", createImageText); 
router.get("/all-sections", getAllImageTextSections); 
router.get("/:id", getImageTextSectionById); 
router.put("/update/:id", updateImageTextSectionById); 
router.delete("/delete/:id", softDeleteImageTextSectionById); 
router.patch("/restore/:id", restoreDeletedImageTextSectionById);

export default router;
