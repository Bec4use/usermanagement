import { Link, Outlet } from 'react-router-dom';
import { HiHome, HiUserGroup, HiViewGridAdd, HiUser, HiLogout } from 'react-icons/hi';

const Dashboard = () => {
  return (
    <div className="flex  min-h-screen">
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
                className="flex items-center p-2 rounded hover:bg-gray-800 transition duration-300"
              >
                <HiHome className="w-6 h-6 mr-2" />
                <span className="text-lg">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/usersmanage"
                className="flex items-center p-2 rounded hover:bg-gray-800 transition duration-300"
              >
                <HiUserGroup className="w-6 h-6 mr-2" />
                <span className="text-lg">User Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/category"
                className="flex items-center p-2 rounded hover:bg-gray-800 transition duration-300"
              >
                <HiViewGridAdd className="w-6 h-6 mr-2" />
                <span className="text-lg">Departments</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/profile"
                className="flex items-center p-2 rounded hover:bg-gray-800 transition duration-300"
              >
                <HiUser className="w-6 h-6 mr-2" />
                <span className="text-lg">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="flex items-center p-2 rounded hover:bg-gray-800 transition duration-300"
              >
                <HiLogout className="w-6 h-6 mr-2" />
                <span className="text-lg">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="grid-cols-1 m-0 p-0 w-full">
        {/* Nav Bar */}
        <div className='p-2 shadow-md flex items-center justify-center bg-gray-800'>
          <h1 className="text-3xl font-bold text-white">User Management System</h1>
        </div>
        {/* Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;