import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HiHome, HiUserGroup, HiViewGridAdd, HiLogout, HiUser } from 'react-icons/hi';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout")
      .then(result => {
        if (result.data.logoutStatus) {
          console.log(result.data.message);
          navigate('/login');
        } else {
          console.log(result.data.message);
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="flex  min-h-screen bg-gray-700">
      {/* Sidebar */}
      <div className="bg-gray-900 text-gray-100 p-4 w-72 sm:block hidden">
        <div className="mb-8">
          <Link to="/dashboard" className="text-white font-bold text-2xl flex items-center">
            <span className="mr-2">Management System</span>
          </Link>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center p-2 rounded transition duration-300 ${location.pathname === '/dashboard' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
              >
                <HiHome className="w-6 h-6 mr-2" />
                <span className="text-lg">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/usersmanage"
                className={`flex items-center p-2 rounded transition duration-300 ${location.pathname === '/dashboard/usersmanage' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
              >
                <HiUserGroup className="w-6 h-6 mr-2" />
                <span className="text-lg">User Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/category"
                className={`flex items-center p-2 rounded transition duration-300 ${location.pathname === '/dashboard/category' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
              >
                <HiViewGridAdd className="w-6 h-6 mr-2" />
                <span className="text-lg">Departments</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/profile"
                className={`flex items-center p-2 rounded transition duration-300 ${location.pathname === '/dashboard/profile' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
              >
                <HiUser className="w-6 h-6 mr-2" />
                <span className="text-lg">Profile</span>
              </Link>
            </li>
            <li>
              <button
                className="flex items-center p-2 rounded hover:bg-gray-800 transition duration-300 w-full"
                onClick={handleLogout}
              >
                <HiLogout className="w-6 h-6 mr-2" />
                <span className="text-lg">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="grid-cols-1 m-0 p-0 w-full">
        {/* Nav Bar */}
        <div className="sticky top-0 z-10 backdrop-blur-3xl bg-gray-800/40 shadow-md p-4 flex items-center justify-center backdrop-filter">
          <h1 className="text-3xl font-bold text-white">User Management System</h1>
        </div>
        {/* Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;