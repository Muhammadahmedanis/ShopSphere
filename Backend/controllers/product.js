import { responseMessages } from "../constant/responseMessages.js";
const { NO_USER, GET_SUCCESS_MESSAGES, DELETED_SUCCESS_MESSAGES, UPDATE_SUCCESS_MESSAGES, INVALID_CREDENTIALS, ADD_SUCCESS_MESSAGES, INTERNAL_ERROR_MESSAGE } = responseMessages;
import { StatusCodes } from "http-status-codes";
import { sendError, sendSuccess } from "../utils/responses.js";
import Products from '../models/Product.js';
import fs from 'fs';
import cloudinary from "../config/cloudinaryConfig.js";
// @desc    POST
// @route   post /api/v1/product
// @access  Admin

export const createProduct = async (req, res) => {
    const newProduct = new Products(req.body);
    
    try {
        if (!req.file) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                status: false,
                message: 'No image file provided.',
            });
        }

        const folder = 'clothes';

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'image',
            folder: folder,
        });
        
        // Add Cloudinary URL to the product
        newProduct.img = result.secure_url;
        console.log(newProduct.img);

        // Save product to the database
        const savedProduct = await newProduct.save();

        // Remove temporary file
        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
        });

        return res.status(StatusCodes.OK).send(sendSuccess({
            status: true,
            message: 'Product created successfully!',
            data: savedProduct,
        }));
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({
            status: false,
            message: error.message,
        }));
    }
}




// @desc    PUT
// @route   put /api/v1/product/:id
// @access  Admin

export const updatetProduct = async (req, res) => {
    try {
        if(req.params.id){
            const updProduct = await Products.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true})
            return res.status(StatusCodes.OK).send(sendSuccess({status: true,message: UPDATE_SUCCESS_MESSAGES, data: updProduct }))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendSuccess({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}



// @desc    DELETE
// @route   DELETE /api/v1/product/:id
// @access  Admin

export const deleteProduct = async (req, res) => {
    try {
       const product = await Products.findByIdAndDelete(req.params.id);
        if(product){
            console.log(product);
            return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: DELETED_SUCCESS_MESSAGES}))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}





// @desc    GET
// @route   GET /api/v1/product/find/:id
// @access  Private

export const getProduct = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if(product){
            return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: GET_SUCCESS_MESSAGES, data: product}))
        }else{
            return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: INTERNAL_ERROR_MESSAGE}))
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}




// @desc    GET
// @route   GET /api/v1/product
// @access  Public

export const getAllProduct = async (req, res) => {
    const query = req.query.new;
    const queryCategory = req.query.category;
    try {
        let products;
        if (query) {
            products = await Products.find().sort({ createdAt: -1 }).limit(5);
        } else if(queryCategory) {
            products = await Products.find({ categories: {
                $in: [queryCategory]
            }})
        }else{
            products = await Products.find();
        }
        return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: GET_SUCCESS_MESSAGES, data: products}))
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}
