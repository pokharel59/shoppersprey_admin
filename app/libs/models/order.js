import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    date: {
      type: Date,
      default: Date.now
    },
    paid: { type: Boolean, default: false },
    recipient: { type: String, required: true },
    products: { type: String, required: true },
  });
  
  export const orderDetail = mongoose.models.orders || mongoose.model("orders", orderSchema);