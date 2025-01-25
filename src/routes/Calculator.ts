import { Router } from "express";
import CalculatorController from "../controllers/CalculatorController";

const router = Router();

router.post("/calculate", (req, res) =>
  CalculatorController.calculate(req, res, req.app.get("io"))
);
router.post("/history", (req, res) =>
  CalculatorController.getHistory(req, res, req.app.get("io"))
);

export default router;
