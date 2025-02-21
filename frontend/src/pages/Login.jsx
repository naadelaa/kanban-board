import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/heroimg.jpg';
import { useToast } from '../context/ToastContext';
import axios from 'axios';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        const checkuser = localStorage.getItem('user')
        if (checkuser !== null) localStorage.removeItem('user');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: users } = await axios.get('https://67b49c7ca9acbdb38ecfb382.mockapi.io/api/v1/users');
            const user = users.find(u => u.username === e.target.username.value && u.password === e.target.password.value);
            if (user) {
                login(user);
                addToast('Login successfully!');
                navigate('/');
            } else {
                addToast('Incorrect username or password.', { type: 'error' });
            }
        } catch (err) {
            addToast('Login failed', { type: 'error' });
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 bg-gray-200 hidden lg:block">
                <img
                    src={heroImage}
                    alt="hero-image"
                    className="w-full h-screen object-cover"
                />
            </div>
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Login
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;