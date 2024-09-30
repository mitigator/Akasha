import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'password') {
            checkPasswordStrength(value);
        }
    };

    const checkPasswordStrength = (password) => {
        let strength = 'Weak';
        const lengthCriteria = password.length >= 8;
        const numberCriteria = /[0-9]/.test(password);
        const uppercaseCriteria = /[A-Z]/.test(password);
        const specialCharCriteria = /[!@#$%^&*]/.test(password);

        if (lengthCriteria && (numberCriteria || uppercaseCriteria || specialCharCriteria)) {
            strength = 'Medium';
        }
        if (lengthCriteria && numberCriteria && uppercaseCriteria && specialCharCriteria) {
            strength = 'Strong';
        }

        setPasswordStrength(strength);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/auth/register`, formData);
            setMessage(response.data.message);
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setMessage(error.response?.data.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#C9A998]">
            <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg border border-white border-opacity-20">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">Register</h2>
                {message && (
                    <div className={`p-3 rounded-md mb-4 ${message.includes('failed') ? 'bg-red-500' : 'bg-green-500'}`}>
                        <p className="text-white text-sm">{message}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="block w-full px-3 py-2 border border-white border-opacity-50 rounded-md bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="block w-full px-3 py-2 border border-white border-opacity-50 rounded-md bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="block w-full px-3 py-2 border border-white border-opacity-50 rounded-md bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {passwordStrength && (
                            <p className={`mt-2 text-sm ${
                                passwordStrength === 'Strong' ? 'text-green-300' : 
                                passwordStrength === 'Medium' ? 'text-yellow-300' : 'text-red-300'
                            }`}>
                                Password strength: {passwordStrength}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="block w-full px-3 py-2 border border-white border-opacity-50 rounded-md bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Confirm your password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-white">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
