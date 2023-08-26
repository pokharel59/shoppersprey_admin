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
  <div className="max-w-md ml-0 mt-10 p-4 bg-white shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
    {/* Add form fields for product data */}
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
      </select>
    </div>
    {/* <div>
        <input
          type="file"
          accept="image/*"
        // onChange={handleImageChange}
        />
      </div> */}
    <div>
      <button
        type="submit"
        onClick={viewProduct}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Add product
      </button>
    </div>
  </div>
)
}

export default page
