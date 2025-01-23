import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    productId: {
      type: String, // You can use `mongoose.Schema.Types.ObjectId` if it's a reference to a product model
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    size: {
      type: [String], // Array of strings for sizes
      required: true,
    },
    color: {
      type: [String], // Array of strings for colors
      required: true,
    },
    transactionId: {
      type: String,
      default: "price_1QiGp1LgwSSYx4xAc7MM4Ptf", // ID provided by the payment gateway
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
