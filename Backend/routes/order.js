import express from 'express';
import { tokenVerify, verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middleware/token.js';
import { createOrder, deleteOrder, fetchIncomeByMonth, getAllOrder, getOrder, updateOrder, webhook } from '../controllers/order.js';

const orderRouter = express.Router();

orderRouter.post("/checkout", tokenVerify, createOrder);
orderRouter.get("/success/:orderId", (req, res) => {
    const { orderId } = req.params;
    res.send(`Payment Successful! Order ID: ${orderId}`);
});

orderRouter.post("/webhook",express.raw({ type: "application/json" }), webhook)
orderRouter.put("/:id", verifyTokenAndAdmin, updateOrder);
orderRouter.delete("/:id", verifyTokenAndAdmin, deleteOrder);
orderRouter.get("/find/:userId", verifyTokenAndAuthorization, getOrder);
orderRouter.get("/", getAllOrder); //verifyTokenAndAdmin
orderRouter.get("/income", fetchIncomeByMonth); //verifyTokenAndAdmin,


export default orderRouter;