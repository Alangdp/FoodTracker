import { Router } from "express";
import { home, login, register } from "../controllers/page.controller";

const router = Router();

// Rest Routes
router.get("/", home);
router.get("/home", home);

router.get("/company/login", login);
router.get("/company/register", register);

export default router;