import { Link } from 'react-router-dom';
import { HiHome, HiUserGroup, HiViewGridAdd, HiUser, HiLogout } from 'react-icons/hi';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-900 text-gray-100 p-4 w-64">
        <div className="mb-8">
          <Link to="/dashboard" className="text-white font-bold text-2xl flex items-center">
            <span className="mr-2">CWC</span>
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
                to="/users"
                className="flex items-center p-2 rounded hover:bg-gray-800 transition duration-300"
              >
                <HiUserGroup className="w-6 h-6 mr-2" />
                <span className="text-lg">User Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/roles"
                className="flex items-center p-2 rounded hover:bg-gray-800 transition duration-300"
              >
                <HiViewGridAdd className="w-6 h-6 mr-2" />
                <span className="text-lg">Category</span>
              </Link>
            </li>
            <li>
              <Link
                to="/permissions"
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

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Konten utama di sini */}
      </div>
    </div>
  );
};

export default Dashboard;