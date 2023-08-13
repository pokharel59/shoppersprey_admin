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

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return NextResponse.error(405, 'Method Not Allowed');
  }

  try {
    await mongoose.connect(connectionStr);
    const payload = JSON.parse(request.body);
    const imageBuffer = Buffer.from(payload.image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    const product = new Product({
      name: payload.name,
      price: payload.price,
      description: payload.description,
      category: payload.category,
      image: imageBuffer,
    });

    const result = await product.save();
    return response.status(200).json({ result, success: true });
  } catch (error) {
    console.error('Error saving product:', error);
    return response.status(500).json({ success: false });
  }
}
