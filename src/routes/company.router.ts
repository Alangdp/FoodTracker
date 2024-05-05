import { Router } from "express";
import { destroy, index, put, store, login, getCompany } from "../controllers/company.controller";
import { loginRequired } from "../middleware/tokenMiddleware";


const router = Router();


// Rest Routes
router.get("/", loginRequired, index);
router.post("/get/", loginRequired, getCompany);

router.post("/", store);
router.put("/:companyId", put);
router.delete("/:companyId", destroy);
router.post("/login", login);

export default router;