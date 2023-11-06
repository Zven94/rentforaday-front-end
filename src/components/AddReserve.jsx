import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchItems } from '../redux/reserves/apiReserves';
import { setItemDetail } from '../redux/reserves/reserveSlice';
import '../styles/addReserve.css';

function AddReserve() {
  const currentUser = 'user';
  const itemId = null;
  const dispatch = useDispatch();
  let showSelect;
  let itemContent;

  const {
    items, itemsByCity, selectedItem, selectedCity,
    selectedDate,
  } = useSelector((state) => state.reserves);

  // fetch items and reserves
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(setItemDetail(selectedItem));
  }, [dispatch, selectedItem]);

  // show select city and item if itemId is 0, else show select item
  if (itemId) {
    showSelect = (
      <input className="form-control mb-3" type="date" placeholder="Date" aria-label="date" value={selectedDate} />
    );
  } else {
    showSelect = (
      <>
        <div className="input-group mb-3">
          <select className="form-select" id="inputGroupSelect01" value={selectedCity}>
            <option value="">Select a City</option>
            {itemsByCity.map((city) => (
              <option value={city.city} key={city.id}>{city.city}</option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3">
          <select className="form-select" id="inputGroupSelect02" value={selectedItem}>
            <option value="">Select an Item</option>
            {items.filter((city) => city.city === selectedCity).map((city) => (
              <option value={city.id} key={city.id}>{city.name}</option>
            ))}
          </select>
        </div>
        <input className="input-group mb-3" type="date" placeholder="Date" aria-label="date" value={selectedDate} />
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
