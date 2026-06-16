import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../public/logo.png'
import alarm from '../assets/alarm.png';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/login');
    }

    async function handleBellClick() {
        setShowNotifications(!showNotifications);

        if (showNotifications && notifications.length > 0) {
            try {
                await axios.put(`${import.meta.env.VITE_API_URL}/events/notification/mark-read`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // clear the count
                setNotifications([]);
            } catch (err) {
                console.error(err);
            }
        }
    }

    useEffect(() => {
        if (!token) return;

        async function fetchNotifications() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/events/notifications`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setNotifications(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchNotifications();
    }, []);

    return (
        <nav
            className="flex justify-between items-center px-8 py-4 shadow-lg"
            style={{ background: '#1a0533' }}
        >
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <img src={logo} alt="Locana logo" className="h-8 w-auto" />
                <h1 className="font-extrabold text-xl text-white hover:text-pink-200">
                    Locana
                </h1>
            </div>

            <div className="flex items-center gap-6">
                {token ? (
                    <>
                        <button
                            onClick={() => navigate('/')}
                            className="text-white font-medium hover:text-pink-200 transition-colors duration-200"
                        >
                            Home
                        </button>

                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-white font-medium hover:text-pink-200 transition-colors duration-200"
                        >
                            My Events
                        </button>

                        <div className="relative">
                            {/* Bell always shows */}
                            <span
                                className="text-2xl cursor-pointer"
                                onClick={handleBellClick}
                            >
                                {alarm}
                            </span>

                            {/* Badge always shows if notifications exist */}
                            {notifications.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {notifications.length}
                                </span>
                            )}

                            {/* Dropdown only shows when bell is clicked */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50">
                                    <div className="p-4 border-b border-gray-100">
                                        <h3 className="font-bold text-gray-800">Notifications</h3>
                                    </div>
                                    {notifications.length === 0 ? (
                                        <p className="text-gray-400 text-sm p-4">No notifications yet</p>
                                    ) : (
                                        notifications.map((n) => (
                                            <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50">
                                                <p className="text-sm text-gray-700">{n.message}</p>
                                                <p className="text-xs text-gray-400 mt-1">{new Date(n.created_at).toLocaleDateString('en-GB')}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => navigate('/create')}
                            className="bg-white text-pink-600 px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                            + Create Event
                        </button>

                        <button
                            onClick={handleLogout}
                            className="text-white font-medium hover:text-red-200 transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-white font-medium hover:text-pink-200 transition-colors duration-200"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => navigate('/register')}
                            className="bg-white text-pink-600 px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                            Register
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

