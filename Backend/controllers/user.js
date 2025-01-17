import { responseMessages } from "../constant/responseMessages.js";
const { NO_USER, GET_SUCCESS_MESSAGES, DELETED_SUCCESS_MESSAGES, UPDATE_SUCCESS_MESSAGES, INVALID_CREDENTIALS, INTERNAL_ERROR_MESSAGE } = responseMessages;
import { StatusCodes } from "http-status-codes";
import { sendError, sendSuccess } from "../utils/responses.js";
import Users from '../models/user.js'

// @desc    PUT
// @route   put /api/v1/user/:id
// @access  Private

export const updatetUser = async (req, res) => {
    try {
        if(req.params.id){
            const updUser = await Users.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true})
            return res.status(StatusCodes.OK).send(sendSuccess({status: true,message: UPDATE_SUCCESS_MESSAGES, data: updUser }))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendSuccess({status: false, message: INVALID_CREDENTIALS}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}




// @desc    DELETE
// @route   DELETE /api/v1/user/:id
// @access  Private

export const deletetUser = async (req, res) => {
    try {
        const users = await Users.findByIdAndDelete(req.params.id);
        if(users){
            console.log(users);
            return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: DELETED_SUCCESS_MESSAGES, data: users}))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}



 
// @desc    GET
// @route   GET /api/v1/user/find/:id
// @access  Private

export const getUser = async (req, res) => {
    try {
        const users = await Users.findById(req.params.id);
        if(users){
            return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: GET_SUCCESS_MESSAGES, data: users}))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}




// @desc    GET
// @route   GET /api/v1/user
// @access  Public

export const getAllUser = async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await Users.find().sort({ _id: -1 }).limit(5) : await Users.find();
        if(users){
            return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: GET_SUCCESS_MESSAGES, data: users}))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}





// @desc    GET
// @route   GET /api/v1/user/stats
// @access  Public

export const fetchUsersByMonth =  async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));
    try {
        const data = await Users.aggregate([
            {$match: {createdAt: { $gte: lastYear } } },
            {
                $project: {
                month: {$month: "$createdAt"},
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },

                }
            }
        ]);
        return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: GET_SUCCESS_MESSAGES, data}))
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}