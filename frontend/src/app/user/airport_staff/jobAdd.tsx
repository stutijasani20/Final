import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FiBriefcase, FiFileText, FiCalendar } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import "react-toastify/dist/ReactToastify.css";

interface AddJobModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Department {
    id: number;
    name: string;
}

interface DepartmentResponse {
    results: Department[];
    count: number;
    next: string | null;
    previous: string | null;
}

const AddJobModal: React.FC<AddJobModalProps> = ({ showModal, setShowModal }) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [requirements, setRequirements] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [salary, setSalary] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [start_date, setStartDate] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [departmentdata, setDepartmentData] = useState<Department[]>([]);
    const [departments, setDepartments] = useState<number | null>(null);
    const [loadingDepartments, setLoadingDepartments] = useState<boolean>(false);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            setLoadingDepartments(true);
            const response = await axios.get<DepartmentResponse>("http://127.0.0.1:8000/department/");
            setDepartmentData(response.data.results);
        } catch (error) {
            console.error("Error fetching departments:", error);
            toast.error("Error fetching departments. Try again later.");
        } finally {
            setLoadingDepartments(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("department", departments ? departments.toString() : "");
        formData.append("description", description);
        formData.append("requirements", requirements);
        formData.append("location", location);
        formData.append("salary", salary);
        if (image) {
            formData.append("image", image);
        }
        formData.append("start_date", start_date);
        formData.append("type", type);

        try {
            setLoading(true);
            const response = await axios.post(
                "http://127.0.0.1:8000/jobs/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 201) {
                console.log("Job Data added successfully");

                setShowModal(false);
                toast.success("Job Data added Successfully !");
            } else {
                console.error("Failed to add job");
                toast.error("Error in adding Job. Try Again Later");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error in adding Job. Try Again Later");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div>
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        );
    }

    return (
        <div>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={{
                    content: {
                        position: "absolute",
                        top: "40%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-40%, -40%)",
                        overflow: "auto",
                        overflowY: "auto",
                        maxHeight: "80vh",
                        padding: "30px",
                        borderRadius: "20px",
                        border: "1px solid #ccc",
                        background: "#eee",
                        zIndex: "9999",
                        boxShadow: "0 5px 8px 0 hsla(0, 0%, 0%, 0.2)",
                        transition: "all 0.3s ease-out",
                    },
                    overlay: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        zIndex: "9998",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    },
                }}
            >
                <div className="flex flex-col items-center animate-fade-in-down">
                <ToastContainer position="top-right" />
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4 ml-auto transition duration-200 ease-in-out transform hover:scale-105"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                    <div className="mt-4 p-4 border-b border-gray-200 bg-gray-50 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <FiBriefcase className="mr-2 text-blue-600" />
                            <span className="text-lg">Add Job Details</span>
                        </h2>
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="jobTitle"
                                >
                                    Job Title
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-md p-2">
                                    <FiBriefcase className="mr-2 text-blue-600" />
                                    <input
                                        type="text"
                                        id="jobTitle"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full outline-none"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                                    Department
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-md p-2">
                                <FcDepartment className="mr-2 text-blue-600" />
                                    <select
                                        id="department"
                                        value={departments ?? ""}
                                        onChange={(e) => setDepartments(parseInt(e.target.value))}
                                        className="w-full outline-none"
                                    >
                                        <option value="">Select Department</option>
                                        {departmentdata.map((department) => (
                                            <option key={department.id} value={department.id}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="jobDescription"
                                >
                                    Job Description
                                </label>
                                <div className="flex items-center border border-gray-300                                rounded-md p-2">
                                    <FiFileText className="mr-2 text-blue-600" />
                                    <textarea
                                        id="jobDescription"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full outline-none"
                                        placeholder="After Writing each description add a fullstop (.)"
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="requirements"
                                >
                                    Requirements
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-md p-2">
                                    <textarea
                                        id="requirements"
                                        value={requirements}
                                        onChange={(e) => setRequirements(e.target.value)}
                                        className="w-full outline-none"
                                        rows={4}
                                        placeholder="After writing each requirement add a comma (,)"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="location"
                                >

                                    Location
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-md p-2">
                                <FaLocationDot className="mr-2 text-blue-600" />
                                    <input
                                        type="text"
                                        id="location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full outline-none"
                                    />
                                     
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="salary"
                                >
                                    Salary
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-md p-2">
                                    <FaRupeeSign className="mr-2 text-blue-600" />
                                    <input
                                        type="text"
                                        id="salary"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        className="w-full outline-none"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="image"
                                >
                                    Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setImage(e.target.files[0]);
                                        }
                                    }}
                                    className="w-full outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="startDate"
                                >
                                    Start Date
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-md p-2">
                                    <FiCalendar className="mr-2 text-blue-600" />
                                    <input
                                        type="date"
                                        id="startDate"
                                        value={start_date}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full outline-none"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="type"
                                >
                                    Type
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-md p-2">
                                    <input
                                        type="text"
                                        id="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="w-full outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
           
        </div>
    );
}

export default AddJobModal;

