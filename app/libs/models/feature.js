import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
    title: String,
    description: String,
});

export const featuresDetail = mongoose.models.features || mongoose.model("features", featureSchema);