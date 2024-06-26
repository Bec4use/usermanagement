import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterForm = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/auth/register", values)
            .then(result => {
                console.log(values);
                if (result.data.registerStatus) {
                    console.log(result.data.message);
                    alert(result.data.message);
                    navigate('/login');
                } else {
                    console.log(result.data.message);
                    setError(result.data.message);
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-500">
            <div className=" p-8 rounded-lg shadow-md w-full max-w-md bg-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-300">Register Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-400 font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-gray-400 font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mt-4">
                        <Link to="/login" className="inline-block align-baseline font-bold text-sm text-gray-500">
                            Already have an account?
                            <span className="text-blue-500 hover:text-blue-800 pl-2">Login</span>
                        </Link>
                    </div>
                    <div className="h-8 mb-1 text-sm">
                        {error && (
                            <p className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded relative font-semibold">
                                {error}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;