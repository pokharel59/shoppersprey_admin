import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  paid: { type: String, required: true },
  name: { type: String, required: true },
  recipient: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: Number, reqired: true },
  orderStatus: { type: String, required: true }
});

export const orderDetail = mongoose.models.orders || mongoose.model("orders", orderSchema);

const schemaOrder = new mongoose.Schema({
  paid: String,
  name: String,
  recipient: String,
  price: String,
  quantity: { type: Number, reqired: true },
  orderStatus: String
});

export const OrderFetch = mongoose.models.orders || mongoose.model("orders", schemaOrder);
