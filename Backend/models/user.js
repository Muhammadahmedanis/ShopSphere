import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please Add User Name'],
        unique: true,
        minlength: 3,
        maxlength: 20,
        trim: true,

    },
    email: {
        type: String,
        required: [true, 'Please Add Email'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please Add Password'],
        minlength: 8,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetToken: {
        type: String,
        dafault: "",
    },
    expiresIn: {
        type: Date
    },
}, {timestamps: true},
)
export default mongoose.model("Users", userSchema);