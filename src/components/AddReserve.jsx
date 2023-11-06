import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchItems } from '../redux/reserves/apiReserves';
import { setItemDetail } from '../redux/reserves/reserveSlice';
import '../styles/addReserve.css';

function AddReserve() {
  const currentUser = 'user';
  const dispatch = useDispatch();
  let showSelect;
  let itemContent;

  const { selectedItem } = useSelector((state) => state.reserves);

  // fetch items and reserves
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(setItemDetail(selectedItem));
  }, [dispatch, selectedItem]);

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
