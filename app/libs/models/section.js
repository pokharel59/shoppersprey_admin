import mongoose from "mongoose";

const sectionModel = new mongoose.Schema({
    name: String,
});
export const Section =mongoose.models.sections || mongoose.model("sections", sectionModel);