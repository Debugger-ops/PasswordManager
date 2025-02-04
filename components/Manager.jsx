import React, { useEffect, useRef, useState } from 'react';
import { Copy, Eye, EyeOff, Edit2, Trash2 } from 'lucide-react';

const PasswordManager = () => {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const togglePasswordVisibility = () => {
        setShow(prev => !prev);
    };

    const savePassword = () => {
        if (!form.site || !form.username || !form.password) {
            alert("Please fill in all fields.");
            return;
        }

        let newPasswordArray;
        if (editIndex !== null) {
            // Update existing entry
            newPasswordArray = passwordArray.map((item, index) => 
                index === editIndex ? form : item
            );
            setEditIndex(null);
        } else {
            // Add new entry
            newPasswordArray = [...passwordArray, form];
        }

        setPasswordArray(newPasswordArray);
        localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
        setForm({ site: "", username: "", password: "" });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const isFormValid = form.site && form.username && form.password;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert('Copied to clipboard!'))
            .catch(err => alert('Failed to copy: ', err));
    };

    const handleEdit = (index) => {
        const itemToEdit = passwordArray[index];
        setForm(itemToEdit);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this password entry?");
        if (confirmDelete) {
            const newPasswordArray = passwordArray.filter((_, i) => i !== index);
            setPasswordArray(newPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center p-6">
            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-8">
                <h1 className='text-5xl font-extrabold text-center mb-4'>
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span>
                </h1>
                <p className='text-green-700 text-xl text-center mb-8'>Your Secure Password Companion</p>

                <div className="bg-green-50 p-6 rounded-xl shadow-inner mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            value={form.site}
                            onChange={handleChange}
                            placeholder='Website or App URL'
                            className='border-2 border-green-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600'
                            type="text"
                            name="site"
                        />
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder='Username or Email'
                            className='border-2 border-green-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600'
                            type="text"
                            name="username"
                        />
                        <div className="relative md:col-span-2">
                            <input
                                value={form.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                                className='w-full border-2 border-green-500 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-600'
                                type={show ? "text" : "password"}
                                name="password"
                            />
                            <button 
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800"
                            >
                                {show ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    
                    <div className='flex justify-center mt-6'>
                        <button
                            onClick={savePassword}
                            className={`flex items-center space-x-2 ${isFormValid 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-gray-400 cursor-not-allowed'} 
                                text-white rounded-lg px-6 py-2 transition duration-300`}
                            disabled={!isFormValid}
                        >
                            {editIndex !== null ? 'Update Password' : 'Add Password'}
                        </button>
                    </div>
                </div>

                {passwordArray.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-green-700 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">Site</th>
                                    <th className="px-4 py-3 text-left">Username</th>
                                    <th className="px-4 py-3 text-left">Password</th>
                                    <th className="px-4 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => (
                                    <tr key={index} className="border-b hover:bg-green-50 transition">
                                        <td className="px-4 py-3">{item.site}</td>
                                        <td className="px-4 py-3">
                                            {item.username}
                                            <button 
                                                onClick={() => copyToClipboard(item.username)}
                                                className="ml-2 text-green-600 hover:text-green-800"
                                            >
                                                <Copy size={16} />
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            {show ? item.password : '•'.repeat(item.password.length)}
                                            <button 
                                                onClick={() => copyToClipboard(item.password)}
                                                className="ml-2 text-green-600 hover:text-green-800"
                                            >
                                                <Copy size={16} />
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 flex justify-center space-x-2">
                                            <button
                                                onClick={() => handleEdit(index)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Edit2 size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordManager;