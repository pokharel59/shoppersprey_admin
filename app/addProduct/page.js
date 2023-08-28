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
  <div className="flex flex-col items-centre mt-2">
    <div className="bg-white p-6 rounded-md max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Product</h1>
      <div className="mb-4">
        <label htmlFor="productName" className="block text-lg font-semibold mb-1">Product Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="productName"
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="productPrice" className="block text-lg font-semibold mb-1">Product Price:</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          id="productPrice"
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="productDetails" className="block text-lg font-semibold mb-1">Product Details:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="productDetails"
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-lg font-semibold mb-1">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="category"
          required
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">Select a category</option>
          <option value="Upper">Upper</option>
          <option value="Lower">Lower</option>
        </select>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={viewProduct}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>
    </div>
  </div>
  )
}

export default page
