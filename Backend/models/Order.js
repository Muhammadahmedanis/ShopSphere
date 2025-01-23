import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lineItems: [
        {
            name: String,
            quantity: Number,
            price: Number,
        },
    ],
    totalAmount: {
         type: Number, 
         required: true
         },
    status: { 
        type: String,
        enum: ["pending", "completed", "failed"], 
        default: "pending" 
    },
}, { timestamps: true });

export default mongoose.model("Orders", OrderSchema);