import mongoose, { mongo } from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "app/libs/mongodb";
import { orderDetail } from "app/libs/models/order";

export async function GET(){

    let data = []
        try {
            await mongoose.connect(connectionStr);
            data = await orderDetail.find();
        } catch (error) {
            data={success:false}
        }
    return NextResponse.json({ result: data, success:true });
}