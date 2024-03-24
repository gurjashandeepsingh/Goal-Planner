import { UserService } from "../services/userService.js";
import { body, query, validationResult } from "express-validator";
import { AuthenticationMiddleware } from "../middleware/jwtMIddleware.js";
import { Calculators } from "../services/calculatorServices.js";
import express from "express";
const router = express.Router();

const registerUserValidation = [
  body("name").notEmpty().withMessage("Name must be provided"),
  body("email").notEmpty().withMessage("email ID must be provided"),
  body("password").notEmpty().withMessage("Password must be provided"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("ConfirmPassword must be provided"),
  body("address").notEmpty().withMessage("Address must be provided"),
  body("panNumber").notEmpty().withMessage("Address must be provided"),
  body("accountNumber").notEmpty().withMessage("Address must be provided"),
];
router.post(
  "/registerUser",
  //   new AuthenticationMiddleware().isAuthenticate,
  registerUserValidation,
  async (request, response) => {
    const validationError = validationResult(request);
    if (!validationError.isEmpty()) {
      console.log(validationError);
      throw new Error("Provide all the parameters");
    }
    try {
      const {
        name,
        email,
        password,
        confirmPassword,
        address,
        panNumber,
        accountNumber,
      } = request.body;
      console.log(name, email);
      const ServiceInstance = await new UserService();
      const result = await ServiceInstance.registerUser(
        name,
        email,
        password,
        confirmPassword,
        address,
        panNumber,
        accountNumber
      );
      return response.status(200).send(result);
      logger.info(result);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

const userLoginValidation = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
router.post(
  "/loginUser",
  userLoginValidation,
  //   new AuthenticationMiddleware().isAuthenticate,
  async (request, response) => {
    const validationError = validationResult(request);
    if (!validationError.isEmpty()) {
      throw new Error("Provide all Parameters");
    }
    try {
      const { email, password } = request.body;
      const ServiceInstance = await new UserService();
      const result = await ServiceInstance.userLogin(email, password);
      return response.status(200).send(result);
    } catch (error) {
      response.status(400).send(error);
      console.log(error);
    }
  }
);

export { router as userRoutes };
