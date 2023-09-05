"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';

const EditOrder = (props) => {
  const [paid, setPaid] = useState("No");
  const [recipient, setRecipient] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [orderStatus, setOrderStatus] = useState("pending");

  useEffect(() => {
    getOrderDetail();
  }, []);

  const getOrderDetail = async () => {
    let orderID = props.params.editOrder
    let orderData = await fetch("http://localhost:3000/api/orders/" + orderID);
    orderData = await orderData.json();
    if(orderData.success){
      let result = orderData.result;
      setPaid(result.paid);
      setRecipient(result.recipient);
      setProduct(result.product);
      setQuantity(result.quantity);
      setPrice(result.price);
      setOrderStatus(result.orderStatus);
    }else{
      console.log("Data could not fetched")
    }
  }

  const updateOrder = async () => {
    let orderID = props.params.editOrder
    let data = await fetch("http://localhost:3000/api/orders/" + orderID, {
      method: "PUT",
      body: JSON.stringify({paid, recipient, product, quantity, price, orderStatus})
    });
    data = await data.json();
    if(data.result){
      alert("Order updated")
    }
  }
  return (
    <div className="flex flex-col items-center mt-12">
      <div className="flex items-center mb-0">
        <h1 className="text-2xl font-bold ">Update Product</h1>
      </div>
      <div className="bg-white p-6 rounded-md max-w-md w-full">
        <div className="mb-4">
          <label htmlFor="productPrice" className="block font-bold">Paid:</label>
          <input
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
            type="submit"
            id="productPrice"
            disabled
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productDetails" className="block font-bold">Recipient:</label>
          <textarea
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled
            id="productDetails"
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block font-bold">Product:</label>
          <textarea
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            disabled
            id="productDetails"
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block font-bold">Quantity:</label>
          <textarea
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            disabled
            id="productDetails"
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block font-bold">Price:</label>
          <textarea
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled
            id="productDetails"
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block font-bold">Status:</label>
          <textarea
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            id="productDetails"
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            onClick={updateOrder}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Update product
          </button>
          <Link href="/" className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md">Back</Link>
        </div>
      </div>
    </div>
  )
}

export default EditOrder
