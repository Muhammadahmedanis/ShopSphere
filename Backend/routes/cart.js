import express from 'express';
import { tokenVerify, verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middleware/token.js';
import { createCart, deleteCart, getAllCart, getCart, updateCart } from '../controllers/cart.js';

const cartRouter = express.Router();

cartRouter.post("/", tokenVerify, createCart );
cartRouter.put("/:id", verifyTokenAndAuthorization, updateCart);
cartRouter.delete("/:id", verifyTokenAndAuthorization, deleteCart);
cartRouter.get("/find/:userId", verifyTokenAndAuthorization, getCart);
cartRouter.get("/", verifyTokenAndAdmin, getAllCart);


export default cartRouter;