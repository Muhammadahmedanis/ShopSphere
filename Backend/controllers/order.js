import { responseMessages } from "../constant/responseMessages.js";
const { NO_USER, GET_SUCCESS_MESSAGES, DELETED_SUCCESS_MESSAGES, UPDATE_SUCCESS_MESSAGES, INVALID_CREDENTIALS, ADD_SUCCESS_MESSAGES, INTERNAL_ERROR_MESSAGE } = responseMessages;
import { StatusCodes } from "http-status-codes";
import { sendError, sendSuccess } from "../utils/responses.js";
import Order from "../models/Order.js";




// @desc    POST
// @route   post /api/v1/order
// @access  Public

export const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        if (newOrder) {
            const saveOrder = await newOrder.save();
            return res.status(StatusCodes.OK).send(sendSuccess({status: true,message: ADD_SUCCESS_MESSAGES, data: saveOrder }))
        } else {
            return res.status(StatusCodes.NOT_FOUND).send(sendSuccess({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}



//  @desc    PUT
// @route   put /api/v1/order/:id
// @access  Private

export const updateOrder = async (req, res) => {
    try {
        if(req.params.id){
            const updOrder = await Order.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true})
            return res.status(StatusCodes.OK).send(sendSuccess({status: true,message: UPDATE_SUCCESS_MESSAGES, data: updOrder }))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendSuccess({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}



// @desc    DELETE
// @route   DELETE /api/v1/order/:id
// @access  Admin

export const deleteOrder = async (req, res) => {
    try {
       const order = await Order.findByIdAndDelete(req.params.id);
        if(order){
            console.log(order);
            return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: DELETED_SUCCESS_MESSAGES}))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}





// @desc    GET
// @route   GET /api/v1/order/find/:iuserId
// @access  Private

export const getOrder = async (req, res) => {
    try {
        const orders = await Order.findOne(req.params.userId);
        if(orders){
            return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: GET_SUCCESS_MESSAGES, data: orders}))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}


// @desc    GET
// @route   GET /api/v1/order
// @access  Admin

export const getAllOrder = async (req, res) => {
    try {
        const Orders = await Order.find()
        return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: GET_SUCCESS_MESSAGES, data: Orders}))
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}




// @desc    GET
// @route   GET /api/v1/order/stats
// @access  Admin

export const fetchIncomeByMonth =  async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    
    try {
        const income = await Order.aggregate([
            {$match: {createdAt: { $gte: previousMonth } } },
            {
                $project: {
                  month: {$month: "$createdAt"},
                  sales: "$amount"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },

                },
            },
        ]);
        console.log(income);
        
        return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: GET_SUCCESS_MESSAGES, data: income}))
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}