import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Usermanagement = () => {
    const [users, setUsers] = useState([])
    const [department, setDepartment] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([])

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        console.log(searchQuery);
    };
    useEffect(() => {
        Promise.all([
            axios.get("http://localhost:3000/api/users", { withCredentials: true }),
            axios.get("http://localhost:3000/api/departments", { withCredentials: true })
        ])
            .then(([usersResult, departmentsResult]) => {
                if (usersResult.data.Status) {
                    setUsers(usersResult.data.data)
                    setFilteredUsers(usersResult.data.data)
                } else {
                    alert(usersResult.data.message)
                }

                if (departmentsResult.data.Status) {
                    setDepartment(departmentsResult.data.data)
                } else {
                    alert(departmentsResult.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        const filtered = users.filter(
            (user) =>
                user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredUsers(filtered)
    }, [searchQuery, users])
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/users/${id}`, { withCredentials: true })
            .then((result) => {
                if (result.data.Status) {
                    console.log(result.data.message);
                } else {
                    alert(result.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/users?search=${searchQuery}`, { withCredentials: true })
            .then((usersResult) => {
                if (usersResult.data.Status) {
                    setUsers(usersResult.data.data)
                    setFilteredUsers(usersResult.data.data)
                } else {
                    alert(usersResult.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })

        axios
            .get("http://localhost:3000/api/departments", { withCredentials: true })
            .then((departmentsResult) => {
                if (departmentsResult.data.Status) {
                    setDepartment(departmentsResult.data.data)
                } else {
                    alert(departmentsResult.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [searchQuery])

    return (
        <div className="bg-gray-700 min-h-screen flex justify-center items-center py-12">
            <div className="w-full max-w-7xl">
                <form className="bg-gray-800 shadow-md rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">User Management System</h3>
                    <div className="mb-4 flex justify-between">
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <input
                                type="text"
                                placeholder="Search users"
                                className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <Link
                            to="/dashboard/add_user"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md ml-4"
                        >
                            Add User
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto bg-gray-800 text-white rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="px-4 py-3">Image</th>
                                    <th className="px-4 py-3">First Name</th>
                                    <th className="px-4 py-3 hidden md:table-cell">Last Name</th>
                                    <th className="px-4 py-3 hidden md:table-cell">Gender</th>
                                    <th className="px-4 py-3 hidden md:table-cell">Birthday</th>
                                    <th className="px-4 py-3 hidden lg:table-cell">Department</th>
                                    <th className="px-4 py-3 hidden lg:table-cell">Address</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
                                        <td className="px-4 py-3 text-center">
                                            {user.image && (
                                                <img
                                                    src={user.image}
                                                    alt="User"
                                                    className="w-12 h-12 rounded-full object-cover mx-auto"
                                                />
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-center">{user.firstName}</td>
                                        <td className="px-4 py-3 text-center hidden md:table-cell">{user.lastName}</td>
                                        <td className="px-4 py-3 text-center hidden md:table-cell">{user.gender}</td>
                                        <td className="px-4 py-3 text-center hidden md:table-cell">
                                            {new Date(user.birthday).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-4 py-3 text-center hidden lg:table-cell">
                                            {department.find((d) => d.id === user.departmentId)?.name}
                                        </td>
                                        <td className="px-4 py-3 text-center hidden lg:table-cell truncate max-w-xs">
                                            {user.address}
                                        </td>
                                        <td className="px-4 py-3 text-center flex justify-center">
                                            <Link
                                                to={`/dashboard/edit_user/${user.id}`}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleDelete(user.id)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Usermanagement