import { responseMessages } from "../constant/responseMessages.js";
const { NO_USER, GET_SUCCESS_MESSAGES, DELETED_SUCCESS_MESSAGES, UPDATE_SUCCESS_MESSAGES, INVALID_CREDENTIALS, ADD_SUCCESS_MESSAGES, INTERNAL_ERROR_MESSAGE } = responseMessages;
import { StatusCodes } from "http-status-codes";
import { sendError, sendSuccess } from "../utils/responses.js";
import Cart from '../models/Cart.js';


// @desc    POST
// @route   post /api/v1/cart
// @access  Public

export const createCart = async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        if (newCart) {
            const saveCart = await newCart.save();
            return res.status(StatusCodes.OK).send(sendSuccess({status: true,message: ADD_SUCCESS_MESSAGES, data: saveCart }))
        } else {
            return res.status(StatusCodes.NOT_FOUND).send(sendSuccess({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}



//  @desc    PUT
// @route   put /api/v1/cart/:id
// @access  Private

export const updateCart = async (req, res) => {
    try {
        if(req.params.id){
            const updCart = await Cart.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true})
            return res.status(StatusCodes.OK).send(sendSuccess({status: true,message: UPDATE_SUCCESS_MESSAGES, data: updCart }))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendSuccess({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}



// @desc    DELETE
// @route   DELETE /api/v1/cart/:id
// @access  Admin

export const deleteCart = async (req, res) => {
    try {
       const cart = await Cart.findByIdAndDelete(req.params.id);
        if(cart){
            console.log(cart);
            return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: DELETED_SUCCESS_MESSAGES}))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}





// @desc    GET
// @route   GET /api/v1/cart/find/:iuserId
// @access  Private

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne(req.params.userId);
        if(cart){
            return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: GET_SUCCESS_MESSAGES, data: cart}))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}


// @desc    GET
// @route   GET /api/v1/product
// @access  Admin

export const getAllCart = async (req, res) => {
    try {
        const carts = await Cart.find()
        return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: GET_SUCCESS_MESSAGES, data: carts}))
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}
