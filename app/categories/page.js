"use client"
import React, { useState } from 'react';

const CategoryAddingPage = () => {
    const [categoryName, setCategoryName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [property, setProperty] = useState('');
    const [categoryList, setCategoryList] = useState([]);

    const handleAddCategory = () => {
        // Implement your add category logic here
        // This function will update the categoryList state
    };

    const handleAddProperty = () => {
        // Implement your add property logic here
        // This function will update the properties for the current category
    };

    const handleEditCategory = (index) => {
        // Implement your edit category logic here
    };

    const handleDeleteCategory = (index) => {
        // Implement your delete category logic here
    };

    return (
        <div className="items-center mt-2">
            <h1 className="text-2xl font-bold mb-4">Add New Category</h1>

            {/* Add Category Form */}
            <div className="bg-white rounded-md mb-8">
                <div className="flex justify-between gap-5">
                    <div className="flex flex-col">
                        <label className="block font-semibold mb-2">Category Name:</label>
                        <input
                            type="text"
                            className="border rounded-md py-2 px-3 w-full mb-4"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="block font-semibold mb-2">Parent Category:</label>
                        <input
                            type="text"
                            className="border rounded-md py-2 px-3 w-full mb-4"
                            value={parentCategory}
                            onChange={(e) => setParentCategory(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
            <label className="block font-semibold mb-2">Property:</label>
                <button
                    className="border rounded-md py-2 px-3 mb-4"
                >
                    Add property
                </button>
                        </div>
                <button
                    onClick={handleAddCategory}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md ml-4"
                >
                    Save
                </button>



            {/* Display Category Table */}
            <div className="max-w-6xl p- bg-white rounded-lg overflow-x-auto flex justify-between">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2 font-semibold">Category Name</th>
                            <th className="border p-2 font-semibold">Parent Category</th>
                            <th className="border p-2 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryList.map((category, index) => (
                            <tr key={index}>
                                <td className="border p-2">{category.name}</td>
                                <td className="border p-2">{category.parent}</td>
                                <td className="border p-2">

                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => handleEditCategory(index)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-md mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(index)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md"
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryAddingPage;
