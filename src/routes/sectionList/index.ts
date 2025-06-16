import express from "express";
import { getAllSections, } from "./controller/index";

const router = express.Router();

router.get("/", getAllSections);

export default router;
