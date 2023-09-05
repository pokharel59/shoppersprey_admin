import { connectionStr } from "@/app/libs/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { OrderFetch } from "@/app/libs/models/order";

export async function PUT(request, content){
    console.log(content);
    const orderId = content.params.orderid;
    const filter = {_id:orderId}
    const payload = await request.json();
    console.log(payload);
    await mongoose.connect(connectionStr);
    const result = await OrderFetch.findOneAndUpdate(filter, payload)

    return NextResponse.json({result, success:true})
};

export async function GET(request, content){
    const orderId=content.params.orderid;
    const record = {_id:orderId}
    await mongoose.connect(connectionStr);
    const result = await OrderFetch.findById(record)

    return NextResponse.json({result, success:true})
}