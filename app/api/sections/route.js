import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {connectionStr } from "app/libs/mongodb";
import { Section } from "app/libs/models/section";

export async function POST(request){
    const payload = request.json();
    await mongoose.connection(connectionStr);
    let section = new Section(payload);
    const result = await section.save();
    return NextResponse.json({result, success:true});
}

export async function GET(){
    let data = []
        try {
            await mongoose.connection(connectionStr);
            data = await Section.find();
        } catch (error) {
            data={success:false}
        }
    return NextResponse.json({ result: data, success:true});
}