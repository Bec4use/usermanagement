import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Usermanagement = () => {
    const [users, setUsers] = useState([])
    const [department, setDepartment] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/api/users", { withCredentials: true })
            .then((result) => {

                if (result.data.Status) {
                    setUsers(result.data.data)
                    console.log(result.data.data)
                } else {
                    alert(result.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get("http://localhost:3000/api/departments", { withCredentials: true })
            .then(result => {
                if (result.data.Status) {
                    setDepartment(result.data.data);
                } else {
                    alert(result.data.message);
                }
            }).catch(err => console.log(err));

    }, []);
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

    return (
        <div className='flex justify-center items-center mt-20'>
            <div className="bg-gray-800 text-gray-100 p-4 rounded-md w-full max-w-6xl">
                <form>
                    <div className="mb-4">
                        <h3 className="text-xl font-bold">User Management System</h3>
                    </div>
                    <div className="mb-4 flex">
                        <input
                            type="text"
                            placeholder="Search users"
                            className="mb-4 p-2 rounded-md text-black"
                        />

                    </div>
                    <Link to="/dashboard/add_user" className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md mb-4 inline-block">
                        Add User
                    </Link>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="px-4 py-2">Image</th>
                                    <th className="px-4 py-2">First Name</th>
                                    <th className="px-4 py-2 hidden md:table-cell">Last Name</th>
                                    <th className="px-4 py-2 hidden md:table-cell">Gender</th>
                                    <th className="px-4 py-2 hidden md:table-cell">Birthday</th>
                                    <th className="px-4 py-2 hidden lg:table-cell">Department</th>
                                    <th className="px-4 py-2 hidden lg:table-cell max-w-2">Address</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="bg-gray-600 hover:bg-gray-900 text-white">
                                        <td className="px-4 py-2 text-center">
                                            {user.image && (
                                                <img src={user.image} alt="User" className="w-12 h-12 rounded-full object-cover mx-auto" />
                                            )}
                                        </td>
                                        <td className="px-4 py-2 text-center">{user.firstName}</td>
                                        <td className="px-4 py-2 text-center hidden md:table-cell">{user.lastName}</td>
                                        <td className="px-4 py-2 text-center hidden md:table-cell">{user.gender}</td>
                                        <td className="px-4 py-2 text-center hidden md:table-cell">
                                            {new Date(user.birthday).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-4 py-2 text-center hidden lg:table-cell">
                                            {department.find(d => d.id === user.departmentId)?.name}
                                        </td>
                                        <td className="px-4 py-2 text-center hidden lg:table-cell truncate overflow-hidden max-w-2">
                                            {user.address}
                                        </td>
                                        <td className="px-4 py-2 text-center flex">
                                            <Link
                                                to={`/dashboard/edit_user/` + user.id}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 md:mb-0"
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