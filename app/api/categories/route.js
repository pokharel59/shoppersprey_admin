import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {connectionStr } from "app/libs/mongodb";
import { Category } from "@mui/icons-material";

export async function POST(request){
    const payload = request.json();
    await mongoose.connection(connectionStr);
    let category = new Category(payload);
    const result = await category.save();
    return NextResponse.json({result, success:true});
}

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