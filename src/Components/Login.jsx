import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/login", values)
      .then(result => {
        if (result.data.loginStatus) {
          console.log(result.data.message);
          navigate('/auth/dashboard');
        } else {
          console.log(result.data.message);
          setError(result.data.message);
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
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
              className="block text-gray-700 font-bold mb-2"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;