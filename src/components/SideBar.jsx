import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logoutUser } from '../redux/users/authSlice';

import socialMediaIcons from '../assets/icons';
import '../styles/sideBar.css';

function Sidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <aside>
      <nav>
        <button className="openBtn p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
          <img src={socialMediaIcons.Ham2} alt="button" />
          <br />
          <img src={socialMediaIcons.Ham2} alt="button" />
          <br />
          <img src={socialMediaIcons.Ham2} alt="button" />
        </button>
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
          <button className="btn closeMenu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
            <img src={socialMediaIcons.Ham2} alt="button" />
            <br />
            <img src={socialMediaIcons.Ham2} alt="button" />
            <br />
            <img src={socialMediaIcons.Ham2} alt="button" />
          </button>
          <div className="offcanvas-header">
            <NavLink to="/items" className="text-center w-100 mt-5">
              <p className="fs-3">Logo</p>
            </NavLink>
          </div>
          {user !== null
            ? (
              <div className="offcanvas-body">

                <NavLink to="delete_item"><p>Delete item</p></NavLink>
                <NavLink to="add_item"><p>Add item</p></NavLink>
                <NavLink to="add_reserve"><p>Add Reserve</p></NavLink>
                <NavLink to="reservation_list"><p>My reservations</p></NavLink>
                <NavLink
                  to=""
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <p>Log out</p>
                </NavLink>
              </div>
            )
            : (
              <div className="offcanvas-body">
                <NavLink to="registration"><p>Sign up</p></NavLink>
                <NavLink to="login">
                  <p>Log in</p>
                </NavLink>
              </div>
            )}
          <div className="navFooter">
            <div className="text-center">
              <img src={socialMediaIcons.Facebook} alt="facebook" className="social" />
              <img src={socialMediaIcons.Pinterest} alt="pinterest" className="social" />
              <img src={socialMediaIcons.X} alt="threads" className="social" />
              <img src={socialMediaIcons.Vimeo} alt="vimeo" className="social" />
              <img src={socialMediaIcons.Threads} alt="x" className="social" />
            </div>
            <p>@ 2023 Ruth, Nico & César - Microverse</p>
          </div>
        </div>
      </nav>
    </aside>
  );
}
export default Sidebar;
