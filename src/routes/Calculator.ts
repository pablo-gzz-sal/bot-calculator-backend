import { Router } from "express";
import CalculatorController from "../controllers/CalculatorController";

const router = Router();

router.post("/calculate", CalculatorController.calculate);
router.get("/history", CalculatorController.getHistory);

export default router;
