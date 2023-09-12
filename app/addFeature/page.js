"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Feature = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [image, setImage] = useState('');

  useEffect(() => {
    getFeature();
  }, []);

  const getFeature = async () => {
    try {
      let featureData = await fetch("http://localhost:3000/api/features/64e1a443fe5f89f405beb429");
      if (featureData.ok) {
        const result = await featureData.json();
        if (result.success) {
          setTitle(result.title);
          setDescription(result.description);
        } else {
          console.log("Data could not be fetched");
        }
      } else {
        console.log("Failed to fetch feature data");
      }
    } catch (error) {
      console.log("Error fetching feature:", error);
    }
  };

  const updateFeatures = async () => {
    try {
      let data = await fetch("http://localhost:3000/api/features/64e1a443fe5f89f405beb429", {
        method: "PUT",
        body: JSON.stringify({ title, description })
      });
      if (data.ok) {
        const result = await data.json();
        if (result.result) {
          toast("Feature updated", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 3000,
          });
        }
      } else {
        console.log("Failed to update feature");
      }
    } catch (error) {
      console.log("Error updating feature:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="flex items-center mb-0">
        <h1 className="text-2xl font-bold ml-0">Add a New Feature</h1>
      </div>
      <div className="bg-white p-6 rounded-md max-w-md w-full">
        <div className="mb-4">
          <label htmlFor="title" className="text-lg font-semibold mb-1">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-lg font-semibold mb-1">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="text-lg font-semibold mb-1">Image URL:</label>
          {/* <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          /> */}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            onClick={updateFeatures}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Submit
          </button>
          <Link href="/about" className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md">Back</Link>
        </div>
      </div>
    </div>
  );
};

export default Feature;
