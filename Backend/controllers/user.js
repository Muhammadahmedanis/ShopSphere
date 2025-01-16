import { responseMessages } from "../constant/responseMessages.js";
const { NO_USER, GET_SUCCESS_MESSAGES, DELETED_SUCCESS_MESSAGES, UPDATE_SUCCESS_MESSAGES } = responseMessages;
import { StatusCodes } from "http-status-codes";
import { sendError, sendSuccess } from "../utils/responses.js";
import Users from '../models/user.js'


// @desc    GET
// @route   GET /api/v1/admin/editUser/:id
// @access  Admin

export const editUser = async (req, res) => {
    try {
        const users = await Users.findById(req.params.id);
        if(users){
            return res.status(StatusCodes.OK).send(sendSuccess({status: true,message: UPDATE_SUCCESS_MESSAGES, data: users}))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: NO_USER}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}



// @desc    PUT
// @route   put /api/v1/admin/updateUser/:id
// @access  Admin
export const updatetUser = async (req, res) => {
    try {
        const users = await Users.findByIdAndUpdate( req.params.id, {
            userName: req.body.userName,
            email: req.body.email,
        }, {new: true} );
        if(users){
            return res.status(StatusCodes.OK).send(sendSuccess({status: true,message: UPDATE_SUCCESS_MESSAGES, data: users}))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: NO_USER}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}




// @desc    DELETE
// @route   DELETE /api/v1/admin/delete/:id
// @access  Admin

export const deletetUser = async (req, res) => {
    try {
        const users = await Users.findByIdAndDelete({_id: req.params.id});
        if(users){
            console.log(users);
            return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: DELETED_SUCCESS_MESSAGES, data: users}))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: NO_USER}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}



 
// @desc    GET
// @route   GET /api/v1/admin/getUsers
// @access  Admin

export const getAllUser = async (req, res) => {
    try {
        const users = await Users.find();
        if(users){
            console.log(users);
            return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: GET_SUCCESS_MESSAGES, data: users}))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: NO_USER}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}