"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import DeleteProduct from 'app/deleteProduct';

const ProductPage = () => {
  const getProduct = async () => {
    try {
      const cacheBuster = Date.now();
      let data = await fetch(`http://localhost:3000/api/products?cacheBuster=${cacheBuster}`, {
        method: 'GET',
      });
      let dataArray = await data.json();
      if (dataArray.success) {
        return dataArray.result;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = () => {
    getProduct().then((result) => {
      setProduct(result);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold ml-0">Products</h1>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-b-2"></div>
          </div>
        ) : (
          <div className="max-w-6xl p- bg-white rounded-lg overflow-x-auto flex justify-between">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Product Name</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Image</th> 
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {product.map((item) => (
                  <tr key={item._id}>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">${item.price}</td>
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">{item.category}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={item.image}
                        className="max-w-xs"
                        alt={item.name}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <Link href={`viewProduct/${item._id}`}>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-md">
                            <FontAwesomeIcon icon={faEdit} className="mr-1" />
                            Edit
                          </button>
                        </Link>
                        <DeleteProduct id={item._id} refreshData={refreshData} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Link href="/addProduct">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md ml-4 mr-0">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </Link>
          </div>
        )}
    </div>
  );
};

export default ProductPage;
