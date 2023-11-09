import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setItemId } from '../redux/reserves/reserveSlice';
import './item_detail.css';

export default function ItemDetail() {
  const { itemId } = useParams();
  const numericItemId = parseInt(itemId, 10);
  const dispatch = useDispatch();

  const item = useSelector((state) => state.items.items.find((item) => item.id === numericItemId));

  const handleItemId = () => {
    dispatch(setItemId(numericItemId));
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center w-100 h-100">
      {item ? (
        <div className="d-flex flex-row justify-content-around w-100">
          <div className="">
            <img src={item.image} alt="" className="house-img" />
          </div>
          <div className="w-25 d-flex flex-column justify-content-around align-items-end">
            <div>
              <h2>{item.name}</h2>
            </div>
            <div className="w-100 d-flex flex-row justify-content-between align-items-center p-4 bg-body-secondary back-grey">
              <h3 className="fs-5">Price:</h3>
              <h3 className="fs-5">{item.price}</h3>
            </div>
            <div className="w-100 d-flex flex-row justify-content-between align-items-center p-4 bg-body-secondary back-grey">
              <h3 className="fs-5">Description:</h3>
              <p className="fs-5">{item.description}</p>
            </div>
            <div className="w-100 d-flex flex-row justify-content-between align-items-center p-4 bg-body-secondary back-grey">
              <h3 className="fs-5">Location:</h3>
              <h3 className="fs-5">{item.city}</h3>
            </div>
            <div className="w-100 d-flex flex-row justify-content-between align-items-center">
              <Link to="/" className="d-flex flex-column justify-content-center reserve-buttom" onClick={() => handleItemId()}><h3 className="fs-5">Reserve</h3></Link>
              <Link to="/" className="d-flex flex-column justify-content-center back-buttom"><h3 className="fs-5">Back to items</h3></Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Item not found</p>
      )}
    </div>
  );
}
