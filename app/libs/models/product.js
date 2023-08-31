import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  category: String,
  quantity: { type: Number, required: true },
});

export const Product = mongoose.models.products || mongoose.model("products", productSchema);
