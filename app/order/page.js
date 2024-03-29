"use client"
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const OrdersPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const getOrder = async () => {
    try {
      const cacheBuster = Date.now();
      let data = await fetch(`http://localhost:3000/api/orders?cacheBuster=${cacheBuster}`, {
        method: 'GET',
      });
      let dataArray = await data.json();
      if (dataArray.success) {
        return dataArray.result;
      } else {
        return [];
      }
    } catch (error) {
      console.log('Error fetching orders:', error);
      return [];
    }
  };

  const [order, setOrder] = useState([]);

  useEffect(() => {
    getOrder().then((result) => {
      setOrder(result);
      setIsLoading(false);
    });
  }, []);

  const handleTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  return (
    <div className="flex flex-col items-center mt-4">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-b-2"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <h1 className="text-xl font-semibold mb-4">Orders</h1>
          <table className="mx-auto min-w-full border-collapse">
            <thead>
              <tr className="border-t">
                <th className="border p-3 font-semibold text-left">Date</th>
                <th className="border p-3 font-semibold text-left">Order ID</th>
                <th className="border p-3 font-semibold text-left">Paid</th>
                <th className="border p-3 font-semibold text-left">Recipient</th>
                <th className="border p-3 font-semibold text-left">Product</th>
                <th className="border p-3 font-semibold text-left">Quantity</th>
                <th className="border p-3 font-semibold text-left">Price</th>
                <th className="border p-3 font-semibold text-left">Status</th>
                <th className="border p-3 font-semibold text-left">Total</th>
                <th className="border p-3 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {order.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="border p-3">{item.date}</td>
                  <td className="border p-3">{item._id}</td>
                  <td className="border p-3">{item.paid}</td>
                  <td className="border p-3">{item.recipient}</td>
                  <td className="border p-3">{item.name}</td>
                  <td className="border p-3">{item.quantity}</td>
                  <td className="border p-3">{item.price}</td>
                  <td className="border p-3">{item.orderStatus}</td>
                  <td className="border p-3">{handleTotalPrice(item)}</td>
                  <td className="border px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Link href={`order/${item._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-md">
                        <FontAwesomeIcon icon={faEdit} className="mr-1" />
                        Edit
                      </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;