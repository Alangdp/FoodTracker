import { Router } from "express";
import { destroy, index, put, store, login } from "../controllers/company.controller";
import { loginRequired } from "../middleware/tokenMiddleware";


const router = Router();


// Rest Routes
router.get("/", loginRequired, index);
router.post("/", store);
router.put("/:companyId", put);
router.delete("/:companyId", destroy);
router.post("/login", login);

export default router;