import express from "express";
import 'dotenv/config';
import Stripe from 'stripe';
import { paymentIntegration } from "../controllers/payment.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const paymentRouter = express.Router();
paymentRouter.post("/payment-session", paymentIntegration);

export default paymentRouter;