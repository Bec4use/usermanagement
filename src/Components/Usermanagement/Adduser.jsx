import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Adduser = () => {
    const [startDate, setStartDate] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const [users, setUsers] = useState({
        image: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthday: '',
        departmentId: '',
        address: '',
    });
    const fileInputRef = useRef();
    const onUploadButtonClick = () => {

        fileInputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/users", users, { withCredentials: true })
            .then(result => {
                console.log(result);
                if (result.data.Status) {
                    alert('User created successfully!');
                    navigate('/dashboard/usersmanage');
                    console.log(result.data.data);
                } else {
                    alert('An error occurred while creating the user.');
                }
            })
            .catch(err => console.log(err))
    }
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUsers({ ...users, image: reader.result });
            setImageUrl(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
            console.log(file);
        }
    };
    const handleDeleteImage = () => {
        setUsers({ ...users, image: '' });
        setImageUrl('');
    };
    const [department, setDepartment] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/departments", { withCredentials: true })
            .then(result => {
                if (result.data.Status) {
                    setDepartment(result.data.data);
                } else {
                    alert(result.data.message);
                }
            }).catch(err => console.log(err));
    }, []);
    return (

        <div className="flex flex-col items-center justify-center min-h-screen py-12 sm:px-6 lg:px-8">
            <div className="bg-gray-800 text-gray-300 rounded-lg shadow-lg p-6 w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-4 text-center">User Management</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Create new User
                        </button>
                    </div>
                    <div className="mb-4 flex flex-col sm:flex-row items-center">
                        <div
                            className="w-24 h-24 rounded-full bg-gray-700 mr-4 border-white border mb-4 sm:mb-0"
                            style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        ></div>
                        <div className="flex flex-col sm:flex-row">
                            <button
                                onClick={onUploadButtonClick}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
                            >
                                Upload Profile Picture
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            <button
                                onClick={handleDeleteImage}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
                            >
                                Delete Picture
                            </button>
                        </div>
                    </div>
                    <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                        <div className="grid w-full mb-4 sm:mb-0">
                            <h2 className="p-2">First Name</h2>
                            <input
                                type="text"
                                placeholder="Please enter First name"
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg"
                                onChange={(e) => setUsers({ ...users, firstName: e.target.value })}
                            />
                        </div>
                        <div className="grid w-full">
                            <h2 className="p-2">Last Name</h2>
                            <input
                                type="text"
                                placeholder="Please enter Last name"
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg"
                                onChange={(e) => setUsers({ ...users, lastName: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row mb-4">
                        <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-2">
                            <h2 className="p-2">Gender</h2>
                            <select
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg w-full"
                                onChange={(e) => setUsers({ ...users, gender: e.target.value })}
                            >
                                <option value="">Please select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="w-full sm:w-1/2 sm:pl-2">
                            <h2 className="p-2">Birthday</h2>
                            <div className="relative flex items-center bg-gray-700 text-gray-300 px-4 py-2 rounded-lg w-full">
                                <DatePicker
                                    className="w-full"
                                    placeholderText="DD/MM/YYYY"
                                    selected={startDate}
                                    onChange={(date) => {
                                        const isoDate = date.toISOString();
                                        setUsers({ ...users, birthday: isoDate });
                                        setStartDate(date);
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    showYearDropdown
                                    yearDropdownItemNumber={100} // จำนวนปีที่จะแสดงในดรอปดาวน์
                                    scrollableYearDropdown
                                />
                                <FaCalendarAlt className="absolute right-4" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4 sm:justify-between">
                        <div className="w-full mb-4 sm:mb-0">
                            <h2 className="p-2">Department</h2>
                            <select
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg w-full"
                                onChange={(e) => setUsers({ ...users, departmentId: e.target.value })}
                            >
                                <option value="">Select a department</option>
                                {department.map(d =>
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="grid w-full">
                            <h2 className="p-2">Address</h2>
                            <input
                                type="text"
                                placeholder="Please enter your address"
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg"
                                onChange={(e) => setUsers({ ...users, address: e.target.value })}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Adduser