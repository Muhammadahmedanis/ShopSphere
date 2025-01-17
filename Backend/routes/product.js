import express from 'express'
import { verifyTokenAndAdmin } from '../middleware/token.js';
import { createProduct, deleteProduct, getAllProduct, getProduct, updatetProduct } from '../controllers/product.js';
const productRouter = express.Router();

productRouter.post("/", verifyTokenAndAdmin, createProduct);
productRouter.put("/:id", verifyTokenAndAdmin, updatetProduct);
productRouter.delete("/:id", verifyTokenAndAdmin, deleteProduct);
productRouter.get("/find/:id", getProduct);
productRouter.get("/", getAllProduct);

export default productRouter;