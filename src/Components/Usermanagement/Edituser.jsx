import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Edituser = () => {
    const { id } = useParams();
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
        axios.put(`http://localhost:3000/api/users/${id}`, users, { withCredentials: true })
            .then(result => {
                if (result.data.Status) {
                    alert(result.data.message);
                    navigate('/dashboard/usersmanage');
                } else {
                    alert(result.data.message);
                }
            }).catch(err => console.log(err));

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
        axios.get(`http://localhost:3000/api/users/${id}`, { withCredentials: true })
            .then(result => {
                if (result.data.Status) {
                    console.log(result.data.data);
                    setUsers({
                        firstName: result.data.data.firstName,
                        lastName: result.data.data.lastName,
                        gender: result.data.data.gender,
                        departmentId: result.data.data.departmentId,
                        address: result.data.data.address,
                        birthday: result.data.data.birthday,
                    });
                    setStartDate(new Date(result.data.data.birthday));
                    setImageUrl(result.data.data.image);
                } else {
                    alert(result.data.message);
                }
            }).catch(err => console.log(err));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800 text-gray-300 rounded-lg shadow-lg p-6 w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Edit Information
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Save Changes
                        </button>
                    </div>
                    <div className="mb-4 flex flex-col sm:flex-row items-center">
                        <div
                            className="w-24 h-24 rounded-full bg-gray-700 mr-4 mb-4 sm:mb-0 border-white border"
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
                    <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                        <div className="w-full mb-4 sm:mb-0">
                            <h2 className="p-2">First Name</h2>
                            <input
                                type="text"
                                placeholder="Please enter First name"
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg w-full"
                                onChange={(e) => setUsers({ ...users, firstName: e.target.value })}
                                value={users.firstName}
                            />
                        </div>
                        <div className="w-full">
                            <h2 className="p-2">Last Name</h2>
                            <input
                                type="text"
                                placeholder="Please enter Last name"
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg w-full"
                                onChange={(e) => setUsers({ ...users, lastName: e.target.value })}
                                value={users.lastName}
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex flex-col sm:flex-row">
                        <div className="w-full mb-4 sm:mb-0 sm:pr-2">
                            <h2 className="p-2">Gender</h2>
                            <select
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg w-full"
                                onChange={(e) => setUsers({ ...users, gender: e.target.value })}
                            >
                                <option value={users.gender}>{users.gender}</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="w-full sm:pl-2">
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
                                value={users.departmentId}
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg w-full"
                                onChange={(e) => setUsers({ ...users, departmentId: e.target.value })}
                            >
                                {department.map((d) => (
                                    <option value={d.id} key={d.id} selected={d.id === users.departmentId}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full">
                            <h2 className="p-2">Address</h2>
                            <input
                                type="text"
                                placeholder="Please enter your address"
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg w-full"
                                onChange={(e) => setUsers({ ...users, address: e.target.value })}
                                value={users.address}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Edituser