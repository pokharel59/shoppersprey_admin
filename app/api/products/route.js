import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "app/libs/mongodb";
import { Product } from "app/libs/models/product";

export async function GET() {

  let data = []
      try {
        await mongoose.connect(connectionStr);
        data = await Product.find();
      } catch (error) {
        data={success:false}
      }
  
  return NextResponse.json({ result: data, success:true });
}

export async function POST(request) {
  const payload = await request.json();
  try {
    await mongoose.connect(connectionStr);
    const product = new Product(payload);
    const result = await product.save();
    return response.status(200).json({ result, success: true });
  } catch (error) {
    console.error('Error saving product:', error);
    return response.status(500).json({ success: false });
  }
  }
