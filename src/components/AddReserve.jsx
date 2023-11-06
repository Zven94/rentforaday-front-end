import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchItems } from '../redux/reserves/apiReserves';
import {
  setSelectedItem, setSelectedCity, setSelectedDate, setItemDetail, setIsReserved, setStatus,
} from '../redux/reserves/reserveSlice';
import '../styles/addReserve.css';

function AddReserve() {
  const currentUser = 'user';
  const itemId = null;
  const dispatch = useDispatch();
  let showSelect;
  let itemContent;

  const {
    items, itemsByCity, selectedItem, selectedCity, selectedDate,
  } = useSelector((state) => state.reserves);

  // options select city, save city state, reset isReserved state
  const handleSelectCity = (event) => {
    dispatch(setSelectedCity(event.target.value));
    dispatch(setIsReserved());
  };

  // options select item, save item state, set item details by id, reset isReserved state
  const handleSelectItem = (event) => {
    dispatch(setSelectedItem(Number(event.target.value)));
    dispatch(setIsReserved());
  };

  // options select date, save date state, reset status state
  const handleSelectedDate = (event) => {
    dispatch(setSelectedDate(event.target.value));
    dispatch(setStatus());
  };

  // fetch items and reserves
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(setItemDetail(selectedItem));
  }, [dispatch, selectedItem]);

  // show select city and item if itemId is 0, else show select item
  if (itemId) {
    showSelect = (
      <input className="form-control mb-3" type="date" placeholder="Date" aria-label="date" value={selectedDate} onChange={handleSelectedDate} />
    );
  } else {
    showSelect = (
      <>
        <div className="input-group mb-3">
          <select className="form-select" id="inputGroupSelect01" value={selectedCity} onChange={handleSelectCity}>
            <option value="">Select a City</option>
            {itemsByCity.map((city) => (
              <option value={city.city} key={city.id}>{city.city}</option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3">
          <select className="form-select" id="inputGroupSelect02" value={selectedItem} onChange={handleSelectItem}>
            <option value="">Select an Item</option>
            {items.filter((city) => city.city === selectedCity).map((city) => (
              <option value={city.id} key={city.id}>{city.name}</option>
            ))}
          </select>
        </div>
        <input className="input-group mb-3" type="date" placeholder="Date" aria-label="date" value={selectedDate} onChange={handleSelectedDate} />
      </>
    );
  }

  return (
    <>
      {currentUser.length > 0
        ? (
          <section className="addReserve">
            <h1>Add a Reserve</h1>
            <form>
              {showSelect}

              <button className="btn " type="button">Reserve Now</button>
            </form>
            <div className="itemContent container-sm text-center">
              {itemContent}
            </div>
          </section>
        )
        : <h1 className="container-sm text-center">Sign in!! 👈</h1>}
    </>
  );
}

export default AddReserve;
