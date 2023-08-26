import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/libs/mongodb";
import { featuresDetail } from "@/app/libs/models/feature";

export async function PUT(request, content){
    console.log(content);
    const featureId = content.params.featureid;
    const filter = {_id:featureId}
    const payload = await request.json();
    console.log(payload);
    await mongoose.connect(connectionStr);
    const result = await featuresDetail.findByIdAndUpdate(filter, payload)

    return NextResponse.json({result, success:true})
}

export async function GET(request, content){
    const featureID = content.params.featureid;
    const record = {_id:featureID}
    await mongoose.connect(connectionStr);
    const result = await featuresDetail.findById(record)

    return NextResponse.json({result, success:true})
}