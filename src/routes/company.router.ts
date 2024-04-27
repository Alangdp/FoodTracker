import { Router } from "express";
import { destroy, index, put, store, login } from "../controllers/company.controller";


const router = Router();


// Rest Routes
router.get("/", index);
router.post("/", store);
router.put("/:companyId", put);
router.delete("/:companyId", destroy);
router.post("/login", login);

export default router;