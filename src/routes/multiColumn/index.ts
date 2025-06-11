import express from "express";
import { createMultiColumn } from "./controller";

const router = express.Router();

router.post("/", createMultiColumn);


export default router;
