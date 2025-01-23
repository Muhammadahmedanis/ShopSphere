import { responseMessages } from "../constant/responseMessages.js";
const { NO_USER, GET_SUCCESS_MESSAGES, DELETED_SUCCESS_MESSAGES, UPDATE_SUCCESS_MESSAGES, INVALID_CREDENTIALS, ADD_SUCCESS_MESSAGES, INTERNAL_ERROR_MESSAGE } = responseMessages;
import { StatusCodes } from "http-status-codes";
import { sendError, sendSuccess } from "../utils/responses.js";
import Order from "../models/Order.js";
import 'dotenv/config'
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import Products from '../models/Product.js';


// @desc    POST
// @route   post /api/v1/order
// @access  Public

export const createOrder = async (req, res) => {
    const { cart } = req.body;
    const userId = req.user.data._id;
    try {
          // Step 1: Fetch product details and format lineItems
          const lineItems = await Promise.all(
            cart.map(async (item) => {
                const product = await Products.findById(item.productId); // Replace with your DB logic
                if (!product) throw new Error("Product not found");
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.title,
                            description: product.description || "No description provided",
                            images: [product.img],
                        },
                        unit_amount: Math.round(product.price * 100),
                    },
                    quantity: item.quantity,
                };
            })
        );

        // Step 2: Calculate totalAmount
        const totalAmount = lineItems.reduce(
            (sum, item) => sum + (item.price_data.unit_amount / 100) * item.quantity,
            0
        );
         // Step 3: Save the order to the database
         const order = new Order({
            userId,
            lineItems,
            totalAmount,
            status: "pending",
        });
        await order.save();

        // Step 2: Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:3000/api/v1/success/${order._id}`,
            cancel_url: `http://localhost:3000/cancel?orderId=${order._id}`,
        });

        return res.status(StatusCodes.OK).send({ status: true, data: session.id });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}

export const webhook = async (req, res) => {
    const signature = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            // Find the order and update its status to "completed"
            const orderId = session.success_url.split("orderId=")[1];
            await Order.findByIdAndUpdate(orderId, { status: "completed" });

            console.log(`Order ${orderId} marked as completed.`);
        }

        res.status(StatusCodes.OK).send({ received: true });
    } catch (error) {
        console.error(`Webhook error: ${error.message}`);
        res.status(StatusCodes.BAD_REQUEST).send(`Webhook Error: ${error.message}`);
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
    const previousMonth = new Date(lastMonth.setMonth(lastMonth.getMonth() - 1));
    
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
        return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: GET_SUCCESS_MESSAGES, data: income}))
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}));
    }
}