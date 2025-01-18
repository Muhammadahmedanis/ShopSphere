import express from "express";
import { paymentIntegration } from "../controllers/payment.js";

const paymentRouter = express.Router();
paymentRouter.post("/create-checkout-session", paymentIntegration);

export default paymentRouter;
