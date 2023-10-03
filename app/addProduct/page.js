"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [imageFile, setImageFile] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const viewProduct = async () => {
    if (name === "" || price === "" || description === "" || category === "" || quantity === null) {
      alert("Fields must not be empty");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "b3ugwz9o");
      formData.append("cloud_name", "dfc5smckf");
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("quantity", quantity);

      const response = await fetch("https://api.cloudinary.com/v1_1/dfc5smckf/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        const publicID = data.secure_url;

        // Now, send the product data (including the image URL) to your database API
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            price: price,
            description: description,
            category: category,
            quantity: parseInt(quantity),
            image: publicID,
          }),
        };

        const dbResponse = await fetch("http://localhost:3000/api/products", requestOptions);
        const result = await dbResponse.json();

        if (result.success) {
          toast.success("New product added", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 3000,
          });

          // Clear form fields
          setName("");
          setPrice("");
          setDescription("");
          setCategory("");
          setQuantity(1);
          setImageFile("");
          setImagePreview(null);
        } else {
          toast("Failed to add product:", result, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 3000,
          });
        }
      } else {
        toast("Failed to upload image to Cloudinary", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }

  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    };
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="flex items-center mb-0">
        <h1 className="text-2xl font-bold">Add Product</h1>
      </div>
      <div className="bg-white p-6 rounded-md max-w-md w-full">
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
        <div className='mb-4'>
          <label htmlFor='quantity' className="block text-lg font-semibold mb-1">Quantity:</label>
          <div className="flex border border-gray-300 rounded mb-4">
            <button
              className="px-2 py-1"
              onClick={handleDecreaseQuantity}
            >
              -
            </button>
            <input
              className="px-3"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <button
              className="px-2 py-1"
              onClick={handleIncreaseQuantity}
            >
              +
            </button>
          </div>
        </div>

        <div className="mb-4 flex">
          <label htmlFor="productDetails" className="block text-lg font-semibold mb-1">Image:</label>
          <input
            type="file"
            onChange={(e)=>setImageFile(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-md"
          />
          {imagePreview && (
            <div className="mb-4">
              <label htmlFor="imagePreview" className="block text-lg font-semibold mb-1">Image Preview:</label>
              <img src={imagePreview} alt="Image Preview" className="max-w-xs" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={viewProduct}
            className="relative bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Add Product
          </button>

          <Link href="/viewProduct" className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md">Back</Link>
        </div>
      </div>
    </div>

  )
}

export default page
