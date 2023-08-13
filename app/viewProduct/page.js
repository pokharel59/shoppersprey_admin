"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
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

  useEffect(() => {
    getProduct().then((result) => {
      setProduct(result);
    });
  }, []);

  return (
    <div className="flex justify-center space-x-10 mt-5 w-full">
      <div className="max-w-md p-4 bg-white shadow-lg rounded-lg overflow-scroll">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {product.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>
                  {/* Display the image */}
                  <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    className="max-w-xs"
                  />
                </td>
                <td>
                  <Link href={`viewProduct/${item._id}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </td>
                <td>
                  <DeleteProduct id={item._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        href="/addProduct"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Add product
      </Link>
    </div>
  );
};

export default ProductPage;
