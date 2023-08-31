import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {connectionStr } from "app/libs/mongodb";
import { Categories } from "@/app/libs/models/category";

export async function POST(request){
    const payload = request.json();
    try {
        await mongoose.connect(connectionStr);
        let category = new Categories(payload);
        const result = await category.save();
        return response.status(200).json({result, success: false });
    } catch (error) {
        console.error('Error saving category:', error);
        return response.status(500).json({ success: false });
    }
};

export async function GET(){
    let data = []
        try {
            await mongoose.connection(connectionStr);
            data = await Category.find();
        } catch (error) {
            data={success:false}
        }
    return NextResponse.json({ result: data, success:true});
}