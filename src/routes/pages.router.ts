import { Router } from "express";
import { home, login, register, products} from "../controllers/page.controller";

const router = Router();

// Rest Routes
router.get("/", home);
router.get("/home", home);

router.get("/company/login", login);
router.get("/company/register", register);
router.get("/company/products", products);

export default router;