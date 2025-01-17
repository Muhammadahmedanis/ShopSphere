import { responseMessages } from "../constant/responseMessages.js";
const { NO_USER, GET_SUCCESS_MESSAGES, DELETED_SUCCESS_MESSAGES, UPDATE_SUCCESS_MESSAGES, INVALID_CREDENTIALS, ADD_SUCCESS_MESSAGES, INTERNAL_ERROR_MESSAGE } = responseMessages;
import { StatusCodes } from "http-status-codes";
import { sendError, sendSuccess } from "../utils/responses.js";

export const paymentIntegration = async (req, res) => {
    const { priceId } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
            price: priceId,
            quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        });

        return res.status(StatusCodes.OK).send({ status: true, sessionId: session.id });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}