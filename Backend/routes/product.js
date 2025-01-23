import express from 'express'
import { verifyTokenAndAdmin } from '../middleware/token.js';
import { createProduct, deleteProduct, getAllProduct, getProduct, updatedProduct } from '../controllers/product.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// file storing with extension
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `prod-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) cb(null, true);
    else cb(new Error('Not an image! Please upload only images.'), false);
};

const upload = multer({
    fileFilter: multerFilter,
    storage: multerStorage
})

const productRouter = express.Router();

productRouter.post("/", verifyTokenAndAdmin, upload.single('img'), createProduct); 
productRouter.put("/:id", verifyTokenAndAdmin, upload.single('img'), updatedProduct); 
productRouter.delete("/:id", verifyTokenAndAdmin, deleteProduct);
productRouter.get("/find/:id", getProduct);
productRouter.get("/", getAllProduct);

export default productRouter;