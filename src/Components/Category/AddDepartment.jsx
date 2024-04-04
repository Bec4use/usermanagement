import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddDepartment = () => {
    const [department, setDepartment] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/api/add_department", { department }, { withCredentials: true })
            .then((result) => {
                if (result.data.Status) {
                    alert(result.data.message);
                    navigate("/dashboard/category");
                } else {
                    alert(result.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('An error occurred while adding the category.'); // You can also add an alert for errors
            });
    }

    return (
        <div className="mt-20">
            <div className="bg-gray-800 text-gray-200 p-6 rounded-lg shadow-md w-1/2 mx-auto">
                <h2 className="text-2xl font-bold mb-4">Add Category</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold">Category Name</label>
                        <input
                            type="text"
                            name="category"
                            placeholder="Category Name"
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                    >
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddDepartment