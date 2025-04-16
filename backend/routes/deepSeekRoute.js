import express from "express";
import { askDeepSeek } from "../controllers/deepseekController.js";

const router = express.Router();

router.post("/ask-deepseek",askDeepSeek );

export default router;