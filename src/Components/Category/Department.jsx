import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Department = () => {

    const [category, setCategory] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/departments", { withCredentials: true })
            .then((result) => {

                if (result.data.Status) {
                    setCategory(result.data.data)
                } else {
                    alert(result.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
    return (
        <div className='flex justify-center items-center bg-gray-700 min-h-screen'>
            <div className="bg-gray-800 text-gray-100 p-4 rounded-md w-1/2">
                <div className="mb-4 p-4">
                    <h3 className="text-xl font-bold">Departments</h3>
                </div>
                <Link
                    to="/dashboard/add_category"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md mb-4 inline-block ml-4"
                >
                    Add Department
                </Link>
                <div className="overflow-x-auto pt-10">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="px-4 py-2 hidden md:table-cell">Department ID</th>
                                <th className="px-4 py-2">Department Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.map((c) => (
                                <tr key={c.id} className="bg-gray-600 hover:bg-gray-700">
                                    <td className="px-4 py-2 text-center hidden md:table-cell">{c.id}</td>
                                    <td className="px-4 py-2 text-center">{c.name}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Department