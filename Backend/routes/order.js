import express from 'express';
import { tokenVerify, verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middleware/token.js';
import { createOrder, deleteOrder, fetchIncomeByMonth, getAllOrder, getOrder, updateOrder } from '../controllers/order.js';

const orderRouter = express.Router();

orderRouter.post("/", tokenVerify, createOrder);
orderRouter.put("/:id", verifyTokenAndAdmin, updateOrder);
orderRouter.delete("/:id", verifyTokenAndAdmin, deleteOrder);
orderRouter.get("/find/:userId", verifyTokenAndAuthorization, getOrder);
orderRouter.get("/", verifyTokenAndAdmin, getAllOrder);
orderRouter.get("/income", verifyTokenAndAdmin, fetchIncomeByMonth);


export default orderRouter;