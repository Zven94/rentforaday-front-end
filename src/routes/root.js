import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar';

function Root() {
  return (
    <section className="nav">
      <Sidebar />
      <Outlet />
    </section>
  );
}

export default Root;
