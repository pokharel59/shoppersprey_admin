import React from 'react';
import OrdersPage from './order/page';
import MonthlyOrdersAreaChart from './components/graph';

const DashboardOverview = () => {
  const totalSales = 1000;
  const totalOrders = 156;
  const totalRevenue = 13425.5;

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold ml-0">Dashboard</h1>
      </div>
      <div className="flex mx-auto min-w-full border-collapse gap-6">
        <div className="flex flex-col justify-between p-6 bg-green-500 text-white rounded-lg shadow-lg w-full">
          <div className="text-lg font-bold mb-2">Total Sales</div>
          <div className="text-xl font-bold text-primary">{totalSales}</div>
        </div>
        <div className="flex flex-col justify-between p-6 bg-red-500 text-white rounded-lg shadow-lg w-full">
          <div className="text-lg font-bold mb-2">Total Orders</div>
          <div className="text-xl font-bold text-primary">{totalOrders}</div>
        </div>
        <div className="flex flex-col justify-between p-6 bg-blue-500 text-white rounded-lg shadow-lg w-full">
          <div className="text-lg font-bold mb-2">Total Revenue</div>
          <div className="text-xl font-bold text-primary">${totalRevenue.toFixed(2)}</div>
        </div>
      </div>
      <div className="bg-gray-100 p-0 mt-4 mb-4 mx-auto min-w-full border-collapse">
        <MonthlyOrdersAreaChart />
      </div>
      <div className="p-6 bg-white">
        <OrdersPage />
      </div>
    </div>
  );
};

export default DashboardOverview;
