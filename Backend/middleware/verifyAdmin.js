import { responseMessages } from "../constant/responseMessages.js";
import { StatusCodes } from "http-status-codes";
import { sendError } from "../utils/responses.js";
import { tokenVerify } from "./token.js";
const { ADMIN_ACCESS } = responseMessages;

export const verifyAdmin = async (req, res, next) => {
    try {
        tokenVerify(req, res, next, () => {
            if (req.user?.isAdmin) {
                next()
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).send(sendError({status: false, message: ADMIN_ACCESS}))
            }
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}