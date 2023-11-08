import React, { useState, useEffect } from 'react';
import itemAPI from '../API/itemAPI';

const DeleteItem = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  const fetchItems = async () => {
    try {
      const response = await fetch(`${itemAPI.baseURL}${itemAPI.listItems}`, {
        method: 'GET',
        headers: {
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        setMessage('Failed to fetch items');
      }
    } catch (error) {
      setMessage('Error fetching items');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(`${itemAPI.baseURL}${itemAPI.listItems}/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMessage('Item deleted successfully');
        setItems(items.filter((item) => item.id !== itemId));
      } else {
        setMessage('Failed to delete item');
      }
    } catch (error) {
      setMessage('Error deleting item');
    }
  };

  const handleDelete = (itemId) => {
    deleteItem(itemId);
  };

  return (
    <>
      <div className="deleteItemContent d-flex flex-column justify-content-center align-items-center w-100">
        {items.map((item) => (
          <div key={item.id} className="item">
            <span>{item.name}</span>
            <button type="submit" onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
        <div>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default DeleteItem;
