import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
    const { id } = useParams();
    const [startDate, setStartDate] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({
        firstName: '',
        lastName: '',
        birthday: '',
        gender: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        image: '',
    });

    const fileInputRef = useRef();
    const onUploadButtonClick = () => {

        fileInputRef.current.click();
    };
    const handleInputChange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setAdminData({ ...adminData, image: reader.result });
            setImageUrl(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
            console.log(file);
        }
    };
    const handleDeleteImage = () => {
        setAdminData({ ...adminData, image: '' });
        setImageUrl('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/profile/${id}`, adminData, { withCredentials: true })
            .then(result => {
                if (result.data.Status) {
                    alert(result.data.message);
                    navigate('/dashboard/profile');
                } else {
                    alert(result.data.message);
                }
            }).catch(err => console.log(err));
    };

    useEffect(() => {

        axios.get(`http://localhost:3000/api/profile/${id}`, { withCredentials: true })
            .then(result => {
                if (result.data.Status) {
                    console.log(result.data.data);
                    setAdminData({
                        firstName: result.data.data.firstName,
                        lastName: result.data.data.lastName,
                        gender: result.data.data.gender,
                        address: result.data.data.address,
                        email: result.data.data.email,
                        phone: result.data.data.phone,

                    });
                    setImageUrl(result.data.data.image);
                    setStartDate(new Date(result.data.data.birthday));

                    console.log("Admin Data :", adminData)
                    console.log("Email is :", adminData.email);

                } else {
                    alert(result.data.message);
                }
            }).catch(err => console.log(err));
    }, []);

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-700'>
            <div className="bg-gray-900 text-gray-200 p-8 rounded-lg shadow-lg sm:p-12 md:p-16 lg:p-20 w-3/4">
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold mb-4 sm:text-sm md:text-md lg:text-xl">
                        Profile Information
                    </h2>

                    <div className="mb-4 flex flex-col sm:flex-row items-center">
                        <div
                            className="w-40 h-40 rounded-full bg-gray-700 mr-4 mb-4 sm:mb-0 border-white border"
                            style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        ></div>
                        <div className="flex flex-col sm:flex-row">
                            <button
                                onClick={onUploadButtonClick}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 sm:mb-0"
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
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="firstName" className="block font-medium mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={adminData.firstName}
                            onChange={handleInputChange}
                            className="bg-gray-800 border-gray-700 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block font-medium mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={adminData.lastName}
                            onChange={handleInputChange}
                            className="bg-gray-800 border-gray-700 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="birthday" className="block font-medium mb-1">
                            Birthday
                        </label>
                        <div className="relative flex items-center bg-gray-800 border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 w-full">
                            <DatePicker
                                className="w-full"
                                placeholderText="DD/MM/YYYY"
                                selected={startDate}
                                onChange={(date) => {
                                    const isoDate = date.toISOString();
                                    setAdminData({ ...adminData, birthday: isoDate });
                                    setStartDate(date);
                                }}
                                dateFormat="dd/MMM/yyyy"
                                showYearDropdown
                                yearDropdownItemNumber={100} // จำนวนปีที่จะแสดงในดรอปดาวน์
                                scrollableYearDropdown
                            />
                            <FaCalendarAlt className="absolute right-4" />

                        </div>
                    </div>
                    <div>
                        <label htmlFor="gender" className="block font-medium mb-1">
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={adminData.gender}
                            onChange={handleInputChange}
                            className="bg-gray-800 border-gray-700 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={adminData.email}
                            onChange={handleInputChange}
                            className="bg-gray-800 border-gray-700 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block font-medium mb-1">
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={adminData.phone}
                            onChange={handleInputChange}
                            className="bg-gray-800 border-gray-700 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block font-medium mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={adminData.address}
                            onChange={handleInputChange}
                            className="bg-gray-800 border-gray-700 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            value={adminData.password}
                            onChange={handleInputChange}
                            className="bg-gray-800 border-gray-700 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        >
                            Save All
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile