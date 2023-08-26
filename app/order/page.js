"use client"
import React, { useEffect, useState } from 'react';
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
      setIsLoading(false);
    });
  }, [])

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-bold text-center mb-4">Orders</h1>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-b-2"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="mx-auto min-w-full border-collapse">
            <thead>
              <tr className="border-t">
                <th className="border p-3 font-semibold text-left">Date</th>
                <th className="border p-3 font-semibold text-left">Paid</th>
                <th className="border p-3 font-semibold text-left">Recipient</th>
                <th className="border p-3 font-semibold text-left">Product</th>
              </tr>
            </thead>
            <tbody>
              {order.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="border p-3">{item.date}</td>
                  <td className="border p-3">{item.paid}</td>
                  <td className="border p-3">{item.recipient}</td>
                  <td className="border p-3">{item.products}</td>
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
