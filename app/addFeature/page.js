"use client"
import React, { useState, useEffect } from 'react';

const Feature = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //   const [image, setImage] = useState('');

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
          alert("Feature updated");
        }
      } else {
        console.log("Failed to update feature");
      }
    } catch (error) {
      console.log("Error updating feature:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold ml-0">Add a New Feature</h1>
      </div>
      <div className="max-w-6xl p-bg-white rounded-lg overflow-x-auto flex justify-between">
        <div className="flex flex-col">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            // value={image}
            // onChange={handleImageChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            onClick={updateFeatures}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feature;
