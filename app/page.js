"use client"
import React, { useState, useEffect } from 'react';
import OrdersPage from './order/page';
import MonthlyOrdersAreaChart from './components/graph';

const DashboardOverview = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Fetch data and calculate totals here
    // For example:
    fetchOrdersData().then((data) => {
      setTotalOrders(data.totalOrders);
      setTotalPrice(data.totalPrice);
      setTotalQuantity(data.totalQuantity);
      setOrderData(data.orderData);
    });
  }, []);

  // Fetch orders data and calculate totals
  const fetchOrdersData = async () => {
    try {
      const cacheBuster = Date.now();
      let data = await fetch(`http://localhost:3000/api/orders?cacheBuster=${cacheBuster}`, {
        method: 'GET',
      });
      let dataArray = await data.json();
      if (dataArray.success) {
        const orders = dataArray.result;
        // Calculate totals
        let totalOrders = orders.length;
        let totalQuantity = orders.reduce((acc, order) => acc + order.quantity, 0);
        let totalPrice = orders.reduce((acc, order) => acc + order.price * order.quantity, 0);
        return { totalOrders, totalQuantity, totalPrice, orderData: orders };
      } else {
        return { totalOrders: 0, totalQuantity: 0, totalPrice: 0, orderData: [] };
      }
    } catch (error) {
      console.log('Error fetching orders:', error);
      return { totalOrders: 0, totalQuantity: 0, totalPrice: 0, orderData: [] };
    }
  };

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold ml-0">Dashboard</h1>
      </div>
      <div className="flex mx-auto min-w-full border-collapse gap-6">
        <div className="flex flex-col justify-between p-6 bg-green-500 text-white rounded-lg shadow-lg w-full">
          <div className="text-lg font-bold mb-2">Total Orders</div>
          <div className="text-xl font-bold text-primary">{totalOrders}</div>
        </div>
        <div className="flex flex-col justify-between p-6 bg-red-500 text-white rounded-lg shadow-lg w-full">
          <div className="text-lg font-bold mb-2">Total Quantity</div>
          <div className="text-xl font-bold text-primary">{totalQuantity}</div>
        </div>
        <div className="flex flex-col justify-between p-6 bg-blue-500 text-white rounded-lg shadow-lg w-full">
          <div className="text-lg font-bold mb-2">Total Price</div>
          <div className="text-xl font-bold text-primary">Rs.{totalPrice.toFixed(2)}</div>
        </div>
      </div>
      <div className="bg-gray-100 p-0 mt-4 mb-4 mx-auto min-w-full border-collapse">
        <MonthlyOrdersAreaChart orderData={orderData} />
      </div>
      <div className="p-6 bg-white">
        <OrdersPage />
      </div>
    </div>
  );
};

export default DashboardOverview;
