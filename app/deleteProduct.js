"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteProduct = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteRecord = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`http://localhost:3000/api/products/${props.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        props.refreshData();
      } else {
        console.error('Failed to delete product:', result);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={deleteRecord}
      className={`bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isDeleting}
    >
      <FontAwesomeIcon icon={faTrash} />
      Delete
    </button>
  );
};

export default DeleteProduct;
