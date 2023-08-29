import mongoose from "mongoose";

const categoryModel = new mongoose.Schema({
    name: String,
});
export const Category =mongoose.models.categories || mongoose.model("categories", categoryModel);