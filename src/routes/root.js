import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar';

const Root = () => (
  <section className="nav">
    <Sidebar />
    <Outlet />
  </section>
);

export default Root;
