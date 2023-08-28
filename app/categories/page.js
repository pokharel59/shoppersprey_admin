"use client"
import React, { useState } from 'react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            setCategories([...categories, { name: newCategory }]);
            setNewCategory('');
        }
    };

    const handleEditCategory = (index) => {
        setSelectedCategory(index);
        setNewCategory(categories[index].name);
    };

    const handleUpdateCategory = () => {
        if (newCategory.trim() !== '' && selectedCategory !== null) {
            const updatedCategories = [...categories];
            updatedCategories[selectedCategory].name = newCategory;
            setCategories(updatedCategories);
            setSelectedCategory(null);
            setNewCategory('');
        }
    };

    const handleDeleteCategory = (index) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
    };

    return (
        <div className="flex flex-col items-center mt-2">
            <div className="flex items-center mb-4">
                <h1 className="text-2xl font-bold ml-0">Categories</h1>
            </div>
            {/* Add Category */}
            <div className="max-w-6xl p- bg-white rounded-lg overflow-x-auto flex justify-between">
                <input
                    type="text"
                    placeholder="New category"
                    className="px-4 py-2 border rounded-md"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                {selectedCategory === null ? (
                    <button
                        onClick={handleAddCategory}
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Add
                    </button>
                ) : (
                    <div className="mt-2">
                        <button
                            onClick={handleUpdateCategory}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Display Categories */}
            <ul>
                {categories.map((category, index) => (
                    <li key={index} className="flex items-center justify-between mb-2">
                        <span>{category.name}</span>
                        <div>
                            <button
                                onClick={() => handleEditCategory(index)}
                                className="mr-2 px-2 py-1 text-blue-500 hover:text-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteCategory(index)}
                                className="px-2 py-1 text-red-500 hover:text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;

