import { responseMessages } from "../constant/responseMessages.js";
const { NO_USER, GET_SUCCESS_MESSAGES, DELETED_SUCCESS_MESSAGES, UPDATE_SUCCESS_MESSAGES, INVALID_CREDENTIALS, ADD_SUCCESS_MESSAGES, INTERNAL_ERROR_MESSAGE } = responseMessages;
import { StatusCodes } from "http-status-codes";
import 'dotenv/config'
import { sendError, sendSuccess } from "../utils/responses.js";
import Stripe from 'stripe'; // Import Stripe here

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const paymentIntegration = async (req, res) => {
    const { lineItems } = req.body; // Expecting an array of line items in the request payload
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems, // Dynamically using the lineItems from the request
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        return res.status(StatusCodes.OK).send({ status: true, sessionId: session.id });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({ status: false, message: error.message }));
    }
};