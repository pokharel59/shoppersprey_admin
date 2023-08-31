import React from 'react';
import Link from 'next/link';

const Slidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 py-6">
      <a href="/" className="flex items-center mb-8">
        <img src="/logo.png" className="h-8 mr-3" />
      </a>
      <Link href="/" className="block px-4 py-2 hover:bg-gray-700 mb-4">
        <span className="mr-2">🏠</span> Dashboard
      </Link>
      <Link href="/viewProduct" className="block px-4 py-2 hover:bg-gray-700 mb-4">
        <span className="mr-2">📦</span> Products
      </Link>
      <Link href="/addFeature" className="block px-4 py-2 hover:bg-gray-700 mb-4">
        <span className="mr-2">⭐</span> Features
      </Link>
      <Link href="/categories" className="block px-4 py-2 hover:bg-gray-700 mb-4">
        <span className="mr-2">🗂️</span> Categories
      </Link>
      <Link href="#" className="block px-4 py-2 hover:bg-gray-700 mb-4">
        <span className="mr-2">👥</span> Users
      </Link>
      <Link href="#" className="block px-4 py-2 hover:bg-gray-700 mb-4">
        <span className="mr-2">🔑</span> Sign In
      </Link>
      <Link href="#" className="block px-4 py-2 hover:bg-gray-700 mb-4">
        <span className="mr-2">📝</span> Sign Up
      </Link>
    </div>
  );
};

export default Slidebar;