import mongoose from "mongoose";

const productModel = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  category: String,
  image: String
});

export const Product = mongoose.models.products || mongoose.model("products", productModel);