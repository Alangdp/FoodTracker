import { Router } from "express";
import { home } from "../controllers/page.controller";

const router = Router();

// Rest Routes
router.get("/", home);
router.get("/home", home);
export default router;