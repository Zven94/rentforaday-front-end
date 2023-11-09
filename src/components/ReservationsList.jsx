import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchReserves, deleteReserve, fetchItems } from '../redux/reserves/apiReserves';
import { setIsDeleting } from '../redux/reserves/reserveSlice';
import { setLocalStorage } from '../redux/users/authSlice';
import icons from '../assets/icons';
import '../styles/reservationList.css';
import Spinner from './Spinner';
import 'swiper/css';
import 'swiper/css/pagination';

function ReservationsList() {
  const dispatch = useDispatch();
  const {
    reserves, isDeleting, isLoading, items,
  } = useSelector((state) => state.reserves);
  const { userStorage } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  let reserveContent;

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchReserves());
    dispatch(setIsDeleting());
  }, [dispatch, isDeleting]);

  const handleClick = (reserveId) => {
    dispatch(deleteReserve(reserveId));
    dispatch(fetchReserves());
  };

  const handleBack = () => {
    navigate(-1);
  };

  const itemName = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    return item ? item.name : 'Unknown';
  };

  const itemImage = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    return item ? item.image : 'Unknown';
  };

  const itemDescription = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    return item ? item.description : 'Unknown';
  };

  if (localStorage.getItem('user') !== null) {
    dispatch(setLocalStorage(localStorage.getItem('user')));
  }

  if (isLoading) {
    reserveContent = (
      <div className="container text-center d-flex justify-content-center align-items-center min-vh-100">
        <Spinner />
      </div>
    );
  } else if (userStorage !== null) {
    if (reserves.length > 0) {
      reserveContent = (
        <section className="reserves d-flex align-items-center min-vh-100">
          <img className="custom-prev-button" src={icons.ButtonGreen} alt="left" />
          <Swiper
            className=""
            modules={[Virtual, Navigation, Pagination]}
            centeredSlides
            pagination={{
              type: 'progressbar',
            }}
            navigation={{
              nextEl: '.custom-next-button',
              prevEl: '.custom-prev-button',
            }}
            virtual
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 100,
                allowTouchMove: true,
              },
              890: {
                slidesPerView: 2,
                spaceBetween: 10,
                allowTouchMove: false,
              },
              1180: {
                slidesPerView: 3,
                spaceBetween: 15,
                allowTouchMove: false,
              },
            }}
          >
            {reserves.map((reserve, index) => (
              <SwiperSlide key={reserve.id} virtualIndex={index} className="d-flex justify-content-center align-items-center min-vh-100">
                <li key={reserve.id}>
                  <p className="fs-3 fw-bold">{itemName(reserve.item_id)}</p>
                  <img src={`${itemImage(reserve.item_id)}`} alt={itemName(reserve.item_id)} />
                  <div className="reserveCity d-flex fw-bold justify-content-around mx-auto">
                    <p>{reserve.city}</p>
                    <p>{reserve.date}</p>
                  </div>
                  <p className="dots">...........</p>
                  <p>{itemDescription(reserve.item_id)}</p>
                  <button type="button" className="btn" onClick={() => handleClick(reserve.id)} disabled={isDeleting}>
                    {`Delete ${reserve.id}`}
                  </button>
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
          <img className="custom-next-button" src={icons.ButtonGreen} alt="left" />
        </section>
      );
    } else {
      reserveContent = (<h1 className="container text-center">No Reserves yet</h1>);
    }
  } else {
    reserveContent = (<h1 className="container text-center">Sign in!! 👈</h1>);
  }

  return (
    <>
      <div className="myTitle d-flex flex-column align-items-center justify-content-center position-absolute start-50 translate-middle-x">
        <h1>My Reservations</h1>
        <p>............</p>
      </div>
      {reserveContent}
      <button type="button" className="btn position-absolute back" onClick={() => handleBack()}><img className="backa" src={icons.ButtonGreen} alt="left" /></button>
    </>
  );
}

export default ReservationsList;
