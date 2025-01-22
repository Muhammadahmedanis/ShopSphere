// import cloudinary from "../config/cloudinaryConfig.js";
// import fs from 'fs'
// export const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         //upload file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         return response
//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove saved temporary localFile as upload operation got failed
//         return error
//     }

// }

// // make multer middle ware
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/temp');
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `prod-${Date.now()}.${ext}`);
//     }
// });
// export const upload = multer({storage})