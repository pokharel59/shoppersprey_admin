"use client";
import React, { use, useEffect, useState } from 'react';
import Link from "next/link";

const page = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getProductDetail()
  }, []);

  const getProductDetail = async () => {
    let productID = props.params.editproduct
    let productData = await fetch("http://localhost:3000/api/products/" + productID);
    productData = await productData.json();
    if (productData.success) {
      let result = productData.result;
      setName(result.name);
      setPrice(result.price);
      setDescription(result.description);
      setCategory(result.category);
    } else {
      console.log("Data could not fetched")
    }
  }

  const updateProduct = async () => {
    let productID = props.params.editproduct
    let data = await fetch("http://localhost:3000/api/products/" + productID, {
      method: "PUT",
      body: JSON.stringify({ name, price, description, category })
    });
    data = await data.json();
    if (data.result) {
      alert("Product updated")
    }
  }

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="flex items-center mb-0">
        <h1 className="text-2xl font-bold ">Update Product</h1>
      </div>
      <div className="bg-white p-6 rounded-md max-w-md w-full">
        <div className="mb-4">
          <label htmlFor="productName" className="block font-bold">Product Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="productName"
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productPrice" className="block font-bold">Product Price:</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            id="productPrice"
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productDetails" className="block font-bold">Product Details:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="productDetails"
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block font-bold">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          >
            <option value="">Select a category</option>
            <option value="Upper">Upper</option>
            <option value="Lower">Lower</option>
            {/* Add more category options as needed */}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            onClick={updateProduct}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Update product
          </button>
          <Link href="/viewProduct" className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md">Back</Link>
        </div>
      </div>
    </div>
  )
}

export default page
