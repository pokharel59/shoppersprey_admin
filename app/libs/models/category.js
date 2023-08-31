import mongoose from "mongoose";

const categoryModel = new mongoose.Schema({
    categoryName: String,
});
export const Categories =mongoose.models.categories || mongoose.model("categories", categoryModel);