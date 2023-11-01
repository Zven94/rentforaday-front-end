import { NavLink } from 'react-router-dom';
import socialMediaIcons from '../assets/icons';
import '../styles/sideBar.css';

function Sidebar() {
  return (
    <aside>
      <nav>
        <button className="btn openBtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
          <img src={socialMediaIcons.SidebarOpen} alt="button" />
        </button>
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
          <div className="offcanvas-header">
            <NavLink to="/" className="text-center w-100">
              <p className="fs-3">Logo</p>
            </NavLink>
          </div>
          <div className="offcanvas-body">
            <NavLink to="registration"><p>Sign up</p></NavLink>
            <NavLink to="login"><p>Log in</p></NavLink>
            <NavLink to="delete_item"><p>Delete item</p></NavLink>
            <NavLink to="add_item"><p>Add item</p></NavLink>
            <NavLink to="add_reserve"><p>Add Reserve</p></NavLink>
            <NavLink to="reservation_list"><p>My reservations</p></NavLink>
            <NavLink to=""><p>Log out</p></NavLink>
          </div>
          <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
            <img src={socialMediaIcons.Sidebar} alt="button" className="closeMenu" />
          </button>
        </div>
      </nav>
    </aside>
  );
}
export default Sidebar;
