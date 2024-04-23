import { Router } from "express";
import { destroy, index, put, store } from "../controllers/company.controller";


const router = Router();


// Rest Routes
router.get("/company", index);
router.post("/company", store);
router.put("/company/:companyId", put);
router.delete("/company/:companyId", destroy);

export default router;