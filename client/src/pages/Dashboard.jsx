import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";


function Dashboard() {

    const [events, setEvents] = useState([]);

    const currentDate = Date.UTC.now;
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserEvents() {
            try {
                if (!token) {
                    navigate('/login');
                    return;
                }
                const response = await axios.get('http://localhost:5000/events/my-events', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvents(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchUserEvents();
    }, []);


    async function deleteEvent(id) {
        try {
            const response = await axios.delete(`http://localhost:5000/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` }

            });
            setSuccessMessage("Event successfully deleted");
            navigate('/');
        } catch (err) {
            setErrorMessage("Something went wrong, try again");
            console.error(err);
        }

    }

    // async function updateEvent(id)
    // {
    //     try {
    //             const response = await axios.update(`http://localhost:5000/events/${id}`, {
    //             headers: { Authorization: `Bearer ${token}` }

    //         });
    //         setSuccessMessage("Event successfully updated"); 
    //         navigate('/');
    //         } catch (err) {
    //             setErrorMessage("Something went wrong, try again"); 
    //             console.error(err);
    //         }

    // }




    return (

        <div>
            {errorMessage && <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-xl">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-sm text-center bg-green-50 py-2 rounded-xl">{successMessage}</p>}
            {/* /All user events */}
            <div className="min-h-screen" style={{ background: '#fff5f7' }}>
                <Navbar />

                {/* Hero */}
                <div className="text-center py-20 px-6"
                    style={{ background: 'linear-gradient(135deg, #f953c6 0%, #b91d73 50%, #f9a825 100%)' }}
                >
                    <h1 className="text-5xl font-extrabold text-white mb-4">Welcome back {name}</h1>
                    <p className="text-white/80 text-lg mb-8">Your history of events</p>
                </div>
                {/* Events grid */}
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div key={event.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer border-t-4 border-pink-400">
                                <span className="text-xs font-semibold bg-pink-100 text-pink-600 px-3 py-1 rounded-full">{event.category}</span>
                                <h2 className="text-lg font-bold text-gray-800 mt-3">{event.title}</h2>
                                <p className="text-gray-400 text-sm mt-1">📍 {event.location}</p>
                                <p className="text-gray-400 text-sm">📅 {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                <p className="text-gray-600 text-sm mt-3 line-clamp-2">{event.description}</p>


                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => deleteEvent(event.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition duration-200 shadow-md hover:shadow-lg"
                                    >
                                        Delete
                                    </button>

                                    <button
                                        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition duration-200 shadow-md hover:shadow-lg"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    )
}


export default Dashboard;