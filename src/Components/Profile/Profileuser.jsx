import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { formatDate } from './Format/dateFormat';
import { Link } from 'react-router-dom';

const ProfileUser = () => {
    const { id } = useParams();
    const [startDate, setStartDate] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
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

                } else {
                    alert(result.data.message);
                }
            }).catch(err => console.log(err));
    }, []);

    const myBirthday = formatDate(startDate);

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="bg-gray-700 text-gray-200 p-8 rounded-lg shadow-lg sm:p-12 md:p-16 lg:p-40 w-full max-w-3xl">
                <div className="flex justify-center mb-6">
                    <div className="grid grid-cols-1 justify-center items-center">
                        <h2 className="text-2xl font-bold mb-4 sm:text-3xl md:text-3xl lg:text-4xl">
                            Profile Information
                        </h2>
                        <div className="mb-4 flex flex-col sm:flex-row items-center">
                            <div
                                className="w-40 h-40 rounded-full bg-gray-600 mr-4 mb-4 sm:mb-0 border-gray-500 border-4"
                                style={{
                                    backgroundImage: `url(${imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            ></div>
                            <div className="flex flex-col sm:flex-row items-center sm:items-start">
                                <div className="mr-4">
                                    <p className="font-medium mb-2">{adminData.firstName} {adminData.lastName}</p>
                                    <p className="text-gray-400 text-sm">Software Engineer</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="firstName" className="block font-medium mb-5 text-gray-400">
                            First Name
                        </label>
                        <span
                            className="bg-gray-700 border-gray-600 rounded-md px-4 py-3 w-full"
                        >
                            {adminData.firstName}
                        </span>
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block font-medium mb-5 text-gray-400">
                            Last Name
                        </label>
                        <span
                            className="bg-gray-700 border-gray-600 rounded-md px-4 py-3 w-full"
                        >
                            {adminData.lastName}
                        </span>
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-medium mb-5 text-gray-400">
                            Email
                        </label>
                        <span
                            className="bg-gray-700 border-gray-600 rounded-md px-4 py-3 w-full"
                        >
                            {adminData.email}
                        </span>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block font-medium mb-5 text-gray-400">
                            Phone
                        </label>
                        <span
                            className="bg-gray-700 border-gray-600 rounded-md px-4 py-3 w-full"
                        >
                            {adminData.phone}
                        </span>
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-medium mb-5 text-gray-400">
                            Address
                        </label>
                        <span
                            className="bg-gray-700 border-gray-600 rounded-md px-4 py-3 w-full"
                        >
                            {adminData.address}
                        </span>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block font-medium mb-5 text-gray-400">
                            Birthday
                        </label>
                        <span
                            className="bg-gray-700 border-gray-600 rounded-md px-4 py-3 w-full"
                        >
                            {myBirthday}
                        </span>
                    </div>
                    <div className="col-span-1 sm:col-span-2 flex justify-end">
                        <Link
                            to="/dashboard/profileuser"
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileUser