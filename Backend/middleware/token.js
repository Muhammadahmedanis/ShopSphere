import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import { responseMessages } from '../constant/responseMessages.js';
const { INVALID_TOKEN, ADMIN_ACCESS, NO_USER} = responseMessages;
const { sign, verify } = jwt;

export const generateToken = ({data, res}) => {
    const token = sign({ 
        data,
    }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    // res.cookie("token", token, {
    //     httpOnly: true, // Cookie cannot be accessed by client-side scripts
    //     secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    //     sameSite: "strict", // Prevent cross-site request forgery (CSRF)
    //     maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds  this is cookies expires and automatically logout hojaifa cookies nahi hogi
    // });
    return token;
}

export const tokenVerify = (req, res, next) => {
    try {
            const { authorization } = req.headers
            if ( authorization && authorization.startsWith('Bearer')) {
            const token = authorization.split(" ")[1];
            const data = verify(token, process.env.JWT_SECRET_KEY);
            req.user = data;
            next();
        }else{
            return res.status(StatusCodes.UNAUTHORIZED).send({ status: false, message: INVALID_TOKEN});
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message });
    }
};


export const verifyTokenAndAdmin = (req, res, next) => {
    try {
        tokenVerify(req, res, () => {
            if (req.user.data?.isAdmin) {
                next()
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).send({status: false, message: ADMIN_ACCESS})
            }
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status: false, message: error.message});
    }
}




export const verifyTokenAndAuthorization = (req, res, next) => {
    try {
        tokenVerify(req, res, () => {
            if(req.user._id === req.params.id || req.user.isAdmin){
                next()
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).send(sendError({status: false, message: NO_USER}))
            }
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}