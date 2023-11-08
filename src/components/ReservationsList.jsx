import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchReserves, deleteReserve } from '../redux/reserves/apiReserves';
import { setIsDeleting } from '../redux/reserves/reserveSlice';
import { setLocalStorage } from '../redux/users/authSlice';
import icons from '../assets/icons';
import '../styles/reservationList.css';
import Spinner from './Spinner';
import 'swiper/css';
import 'swiper/css/pagination';

function ReservationsList() {
  const dispatch = useDispatch();
  const { reserves, isDeleting, isLoading } = useSelector((state) => state.reserves);
  const { userStorage } = useSelector((state) => state.auth);
  let reserveContent;

  useEffect(() => {
    dispatch(fetchReserves());
    dispatch(setIsDeleting());
  }, [dispatch, isDeleting]);

  const handleClick = (reserveId) => {
    dispatch(deleteReserve(reserveId));
    dispatch(fetchReserves());
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
                  <p className="fs-3 fw-bold">{reserve.item.name}</p>
                  <img src={`http://127.0.0.1:4000/assets/${reserve.item.image}`} alt={reserve.item.name} />
                  <div className="reserveCity d-flex fw-bold justify-content-around mx-auto">
                    <p>{reserve.city}</p>
                    <p>{reserve.date}</p>
                  </div>
                  <p className="dots">...........</p>
                  <p className="reserveDescription">{reserve.item.description}</p>
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
    </>
  );
}

export default ReservationsList;
