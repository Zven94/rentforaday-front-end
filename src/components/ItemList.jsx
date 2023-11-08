import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import './item.css';

const Item = () => {
  const items = useSelector((state) => state.item.items);

  return (
    <div className="w-100 h-100">
      <h1>Items</h1>
      <ul>
        {items && items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>
              <Link to={`/item/${item.id}`}>
                {item.name}
                {/* <h2>{item.price}</h2>
                <h2>{item.city}</h2>
                <h2>{item.description}</h2>
                <img src={item.image} alt="" className="house-img" /> */}
              </Link>
            </li>
          ))
        ) : (
          <li>No items available</li>
        )}
      </ul>
    </div>
  );
};

export default Item;
