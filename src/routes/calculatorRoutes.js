import { Calculators } from "../services/calculatorServices.js";
import { body, query, validationResult } from "express-validator";
import express from "express";
const router = express.Router();

const goalValidation01 = [
  body("currentBalance").notEmpty().withMessage("Can't be empty"),
  body("targetAmount").notEmpty().withMessage("Can't be Empty"),
  body("monthlyContribution").notEmpty().withMessage("Can't be Empty"),
];
router.post(
  "/goalCalculator01",
  goalValidation01,
  async (request, response) => {
    const validationError = validationResult(request);
    if (!validationError.isEmpty()) {
      throw new Error("Provide all Parameters");
    }
    try {
      const { currentBalance, targetAmount, monthlyContribution } =
        request.body;
      const serviceInstance = await new Calculators();
      const result = await serviceInstance.timetoReachGoal(
        currentBalance,
        targetAmount,
        monthlyContribution
      );
      return response.status(200).send(result);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

const goalValidation02 = [
  body("principal").notEmpty().withMessage("Can't be empty"),
  body("annualIntrest").notEmpty().withMessage("Can't be empty"),
];
router.post(
  "/goalCalculator02",
  goalValidation02,
  async (request, response) => {
    const validationError = validationResult(request);
    if (!validationError.isEmpty()) {
      throw new Error("Provide all Parameters");
    }
    try {
      const { principal, annualIntrest } = request.body;
      const serviceIntrest = await new Calculators();
      const result = await serviceIntrest.totalAmountAfterIntrest(
        principal,
        annualIntrest
      );
      response.status(200).json(result);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

const goalValidation03 = [
  body("amount").notEmpty().withMessage("Can't be empty"),
  body("months").notEmpty().withMessage("Can't be empty"),
];
router.post(
  "/goalCalculator03",
  goalValidation03,
  async (request, response) => {
    const validationError = validationResult(request);
    if (!validationError.isEmpty()) {
      throw new Error("Provide all Parameters");
    }
    try {
      const { amount, months } = request.body;
      const serviceIntrest = await new Calculators();
      const result = await serviceIntrest.savingsInMonths(amount, months);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

const goalValidation04 = [
  body("monthlyContribution").notEmpty().withMessage("Can't be empty"),
  body("targetAmount").notEmpty().withMessage("Can't be empty"),
  body("annualIntrestRate").notEmpty().withMessage("Can't be empty"),
];
router.post(
  "/goalCalculator04",
  goalValidation04,
  async (request, response) => {
    const validationError = validationResult(request);
    if (!validationError.isEmpty()) {
      throw new Error("Provide all Parameters");
    }
    try {
      const { monthlyContribution, targetAmount, annualIntrestRate } =
        request.body;
      const serviceIntrest = await new Calculators();
      const result = await serviceIntrest.savingsInMonthsWithIntrest(
        monthlyContribution,
        targetAmount,
        annualIntrestRate
      );
      return response.status(200).send(result);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

const goalValidation05 = [
  body("income").notEmpty().withMessage("Can't be empty"),
  body("deduction").notEmpty().withMessage("Can't be empty"),
];
router.post(
  "/goalCalculator05",
  goalValidation05,
  async (request, response) => {
    const validationError = validationResult(request);
    if (!validationError.isEmpty()) {
      throw new Error("Provide all Parameters");
    }
    try {
      const { income, deduction } = request.body;
      const serviceIntrest = await new Calculators();
      const result = await serviceIntrest.calculateTax(income, deduction);
      return response.status(200).send(result);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

export { router as calculatorRoutes };
