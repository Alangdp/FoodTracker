import { Router } from "express";
// import { destroy, index, put, store, login, getCompany } from "../controllers/company.controller";
import { destroy, index, put, store, login, getCompany } from "../controllers/company.controller.session";
// import { loginRequired } from "../middleware/tokenMiddleware";


const router = Router();


// Rest Routes
router.get("/", index);
router.post("/get/", getCompany);

router.post("/", store);
router.put("/:companyId", put);
router.delete("/:companyId", destroy);
router.post("/login", login);

export default router;