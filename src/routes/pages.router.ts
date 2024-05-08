import { Router } from "express";
import { home, login, register, products, productRegister } from "../controllers/page.controller";
import { loginRequired } from "../middleware/tokenMiddleware";

const router = Router();

// Rest Routes
router.get("/", loginRequired,  home);
router.get("/home", home);

router.get("/company/login", login);
router.get("/company/register", register);

router.get("/company/products", products);
router.get("/company/products/register", productRegister);


export default router;