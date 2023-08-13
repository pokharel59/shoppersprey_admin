import React from 'react';
import Link from 'next/link';

const OrdersPage = () => {
  const orders = [
    { id: 1, orderNumber: 'ORD12345', totalAmount: 150.00, status: 'Shipped' },
    { id: 2, orderNumber: 'ORD67890', totalAmount: 99.99, status: 'Processing' },
    { id: 3, orderNumber: 'ORD24680', totalAmount: 75.50, status: 'Delivered' },
    // Add more orders as needed
  ];

  return (
    <div>
      <h1>Orders Page</h1>
      {/* <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <Link href={`/order/${order.id}`}>
              <a>
                Order: {order.orderNumber} - Total: ${order.totalAmount.toFixed(2)} - Status: {order.status}
              </a>
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default OrdersPage;
