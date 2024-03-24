import express from "express";
import bodyParser from "body-parser";
import { logger } from "../winstonLogger.js";
import mongoose from "mongoose";
import { userRoutes } from "./routes/userRoutes.js";
import { calculatorRoutes } from "../src/routes/calculatorRoutes.js";

const app = express();
export const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRoutes);
app.use("/calculator", calculatorRoutes);

function connectDatabase() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/Goal-Planner", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoCreate: true,
    })
    .then(() => {
      logger.info(`Database Connected`);
    })
    .catch((error) => {
      logger.error(error);
    });
}

function runServer() {
  app.listen(port, () => {
    logger.info(`Server running at port ${port}`);
  });
}

function appStartUp() {
  connectDatabase();
  runServer();
}

appStartUp();
