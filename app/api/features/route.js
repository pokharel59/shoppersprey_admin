import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/libs/mongodb";
import { featuresDetail } from "@/app/libs/models/feature";

export async function GET() {
    let data = []
    try {
        await mongoose.connect(connectionStr);
        data = await featuresDetail.find();
    } catch (error) {
        data = {sucess:false}
    }
  return NextResponse.json({ result: data , success:true});

}

export async function POST(request){
    const payload = await request.json();
    try {
        await mongoose.connect(connectionStr);
        const feature = new featuresDetail(payload);
        const result = await feature.save();
        return response.status(200).json({ result, success:true});
    } catch (error) {
        console.log('Error saving features:', error);
        return response.status(500).json({ success:false});
    }
}