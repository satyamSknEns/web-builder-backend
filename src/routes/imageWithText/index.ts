import express from "express";
import {
  createImageWithText,
  getAllImageWithTextSections,
  getImageWithTextById,
  updateImageWithText,
  deleteImageWithText,
} from "./controller/index";

const router = express.Router();

router.post("/", createImageWithText); 
router.get("/", getAllImageWithTextSections); 
router.get("/:id", getImageWithTextById); 
router.put("/:id", updateImageWithText); 
router.delete("/:id", deleteImageWithText); 

export default router;
