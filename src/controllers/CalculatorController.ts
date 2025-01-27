import { Request, Response } from "express";
import CalculatorService from "../services/CalculatorService";
import { Socket } from "socket.io";

class CalculatorController {
  /**
   * @openapi
   * /calculate:
   *   post:
   *     summary: Perform a calculation
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               command:
   *                 type: string
   *     responses:
   *       200:
   *         description: Successful calculation
   *       400:
   *         description: Calculation error
   */
  /**
   * Handles calculation requests.
   */
  static async calculate(req: Request, res: Response): Promise<void> {
    try {
      const { command } = req.body;
      const result = await CalculatorService.calculate(command);
      const io = req.app.get("io");
      io.emit("calculation_result", { command, result });
      res.status(200).json({ success: true, result });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: error || "Calculation failed" });
    }
  }

  /**
   * @openapi
   * /history:
   *   get:
   *     summary: Retrieve calculation history
   *     responses:
   *       200:
   *         description: Successful history retrieval
   *       500:
   *         description: Server error
   */

  /**
   * Fetches the calculation history.
   */
  static async getHistory(io: Socket): Promise<void> {
    io.on("load_history", async () => {
      try {
        const history = await CalculatorService.getHistory();
        io.emit("history_loaded", history);
      } catch (error) {
        console.error("Error while retrieving history:", error);
      }
    });
  }
}

export default CalculatorController;
