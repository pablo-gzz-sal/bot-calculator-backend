import HistoryModel, { IHistory } from "../models/History";

class CalculatorService {
  /**
   * Processes a mathematical expression and saves the result in history.
   * @param command - The math expression.
   * @returns The result of the calculation.
   * @throws {Error} If the expression is invalid or calculation fails
   */

  static async calculate(command: string): Promise<string> {
    if (!command || command.trim() === "") {
      throw new Error("Expression cannot be empty");
    }

    try {
      const result = CalculatorService.evaluateExpression(command);
      await HistoryModel.create({ command, result });
      return result;
    } catch (error) {
      console.error(`Calculation error: ${error}`);
      throw error;
    }
  }

  /**
   * Retrieves the last 10 calculation history entries.
   * @returns An array of history entries.
   */

  static async getHistory(): Promise<IHistory[]> {
    return HistoryModel.find().sort({ createdAt: -1 }).limit(10);
  }

  /**
   * Safely evaluates a mathematical expression.
   * @param expression - Mathematical expression to evaluate
   * @returns Calculated result as a string
   * @throws {Error} For invalid or unsafe expressions
   */

  private static evaluateExpression(expression: string): string {
    try {
      const sanitizedExpression = expression
        .replace(/[^-()\d/*+.]/g, "")
        .trim();

      const lastChar = sanitizedExpression.slice(-1);
      const operators = ["+", "-", "*", "/"];
      if (operators.includes(lastChar)) {
        throw new Error("Invalid mathematical expression");
      }
      return Function(`'use strict'; return (${sanitizedExpression})`)();
    } catch (error) {
      throw new Error("Invalid mathematical expression");
    }
  }
}

export default CalculatorService;
