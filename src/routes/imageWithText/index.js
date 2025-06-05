import express from "express";
import {
  createImageWithText,
  getAllImageWithTextSections,
  getImageWithTextById,
  updateImageWithText,
  deleteImageWithText,
} from "../imageWithText/controller/index.js";

const router = express.Router();

router.post("/", createImageWithText); 
router.get("/", getAllImageWithTextSections); 
router.get("/:id", getImageWithTextById); 
router.put("/:id", updateImageWithText); 
router.delete("/:id", deleteImageWithText); 

export default router;
