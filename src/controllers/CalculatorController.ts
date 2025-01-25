import { Request, Response } from "express";
import CalculatorService from "../services/CalculatorService";

class CalculatorController {
  /**
   * Handles calculation requests.
   */
  static async calculate(req: Request, res: Response, io: any): Promise<void> {
    try {
      const { command } = req.body;
      const result = await CalculatorService.calculate(command);
      io.emit("calculation_result", { command, result });
      res.status(200).json({ success: true, result });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: error || "Calculation failed" });
    }
  }

  /**
   * Fetches the calculation history.
   */
  static async getHistory(req: Request, res: Response, io: any): Promise<void> {
    try {
      const history = await CalculatorService.getHistory();
      io.emit("history_loaded", history);
      res.status(200).json({ success: true, history });
    } catch (error) {
      console.error("Error while retrieving history:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to retrieve history" });
    }
  }
}

export default CalculatorController;
