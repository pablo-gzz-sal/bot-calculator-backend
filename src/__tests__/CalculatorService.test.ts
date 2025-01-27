import CalculatorService from "../services/CalculatorService";
import History from "../models/History";

jest.mock("../models/History", () => ({
  create: jest.fn(),
}));

describe("CalculatorService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should add numbers correctly", async () => {
    const result = await CalculatorService.calculate("2 + 3");
    expect(result).toBe(5);
    expect(History.create).toHaveBeenCalledWith({
      command: "2 + 3",
      result: 5,
    });
  });

  test("should subtract numbers correctly", async () => {
    const result = await CalculatorService.calculate("5 - 3");
    expect(result).toBe(2);
  });

  test("should multiply numbers correctly", async () => {
    const result = await CalculatorService.calculate("4 * 3");
    expect(result).toBe(12);
  });

  test("should divide numbers correctly", async () => {
    const result = await CalculatorService.calculate("6 / 2");
    expect(result).toBe(3);
  });

  test("should handle complex expressions", async () => {
    const result = await CalculatorService.calculate("2 + 3 * 4");
    expect(result).toBe(14);
  });

  test("should throw error for empty expression", async () => {
    await expect(CalculatorService.calculate("")).rejects.toThrow(
      "Expression cannot be empty"
    );
  });

  test("should throw error for invalid expression ending with operator", async () => {
    await expect(CalculatorService.calculate("2 + ")).rejects.toThrow(
      "Invalid mathematical expression"
    );
  });

  test("should remove non-mathematical characters", async () => {
    const result = await CalculatorService.calculate("2 + abc 3");
    expect(result).toBe(5);
  });

  test("should handle decimal calculations", async () => {
    const result = await CalculatorService.calculate("2.5 + 3.5");
    expect(result).toBe(6);
  });
});
