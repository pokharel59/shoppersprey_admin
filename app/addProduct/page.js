"use client";
import React, { useState } from 'react';

const page = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const viewProduct = async () => {
    try {
      console.log(name, price, description, category);

      const requestOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          price: price,
          description: description,
          category: category,
        }),
      };

      const cacheBuster = Date.now();
      const response = await fetch("http://localhost:3000/api/products", requestOptions);
      console.log('API Response:', response);

      const result = await response.json();
      if (result.success) {
        alert("New product added");
        setName('');
        setPrice('');
        setDescription('');
        setCategory('');
      } else {
        alert("Failed to add product:", result);
      }
    } catch (error) {
      console.error('Error adding products:', error);
    }
  };
  return (
    <div className="h-screen relative">
      <div className="bg-white p-4 rounded-md absolute-center">
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Product</h1>
        <div className="mb-2">
          <label htmlFor="productName" className="block text-lg font-semibold mb-1">Product Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="productName"
            required
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="productPrice" className="block text-lg font-semibold mb-1">Product Price:</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            id="productPrice"
            required
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="productDetails" className="block text-lg font-semibold mb-1">Product Details:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="productDetails"
            required
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="category" className="block text-lg font-semibold mb-1">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            required
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Select a category</option>
            <option value="Upper">Upper</option>
            <option value="Lower">Lower</option>
          </select>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={viewProduct}
            className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>

  )
}

export default page
