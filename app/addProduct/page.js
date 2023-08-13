"use client";
import React, { useState } from 'react';

const page = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const viewProduct=async () =>{
    console.log(name, price, description, category, image);
    const imageBase64 = await getBase64(image);
    let response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        description,
        category,
        image: imageBase64, // Include the base64-encoded image
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API Response:', response);
    const result = await response.json();
    if (result.success){
      alert("new product added")
      setName('')
      setPrice('')
      setDescription('')
      setCategory('')
      setImage(null)
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      } else {
        resolve(null);
      }
    });

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
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
          {/* Add more category options as needed */}
        </select>
      </div>
      <div>
        {/* Input field for image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
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
