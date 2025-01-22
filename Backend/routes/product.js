import express from 'express'
import { verifyTokenAndAdmin } from '../middleware/token.js';
import { createProduct, deleteProduct, getAllProduct, getProduct, updatetProduct } from '../controllers/product.js';
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

// productRouter.post("/", upload.single('img'), (req, res) => {
//     console.log("Request Body:", req.body); // Logs other form fields
//     console.log("File Info:", req.file); // Logs file info

//     if (!req.file) {
//         return res.status(400).json({ message: "No file received" });
//     }

//     res.status(200).json({ message: "File received", file: req.file });
// });

productRouter.post("/", upload.single('img'), createProduct); // verifyTokenAndAdmin, 
productRouter.put("/:id",  updatetProduct); // verifyTokenAndAdmin, 
productRouter.delete("/:id", deleteProduct); // verifyTokenAndAdmin,
productRouter.get("/find/:id", getProduct);
productRouter.get("/", getAllProduct);

export default productRouter;