"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const OrdersPage = () => {
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
        return []
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
    });
  }, [])

  return (
    <div className="flex justify-center space-x-10 mt-5 w-full">
      <div className="max-w-md p-4 bg-white shadow-lg rounded-lg overflow-scroll">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Paid</th>
              <th>Recipient</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item) => (
              <tr key={item._id}>
                <td>{item.date}</td>
                <td>{item.paid}</td>
                <td>{item.recipient}</td>
                <td>{item.products}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
