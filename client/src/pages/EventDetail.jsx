
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";



function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const[rsvpMessage, setRsvpMessage] = useState('');

    async function fetchEvent() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/events/${id}`);
            setEvent(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    async function rsvp_response()
    {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/events/${id}/rsvp`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRsvpMessage('You\'re going! 🎉');

            navigate('/');

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchEvent();
    }, []);


    if (!event) return <p>Loading...</p>

    return (
        <div className="min-h-screen" style={{ background: '#fff5f7' }}>
            <Navbar />
            <div className="text-center py-20 px-6"
                style={{ background: 'linear-gradient(135deg, #f953c6 0%, #b91d73 50%, #f9a825 100%)' }}
            >
                <h1 className="text-5xl font-extrabold text-white mb-4">RSVP</h1>
                <p className="text-white/80 text-lg mb-8">Here are the events details</p>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl shadow-md p-8 border-t-4 border-pink-400">
                    <span className="text-xs font-semibold bg-pink-100 text-pink-600 px-3 py-1 rounded-full">{event.category}</span>
                    <h1 className="text-3xl font-extrabold text-gray-800 mt-4">{event.title}</h1>
                    <p className="text-gray-400 text-sm mt-2">📍 {event.location}</p>
                    <p className="text-gray-400 text-sm">📅 {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p className="text-gray-600 mt-6">{event.description}</p>

                    {token ? (
                        <button
                            className="mt-6 w-full py-3 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                            style={{ background: 'linear-gradient(135deg, #f953c6, #b91d73)' }}
                            onClick={rsvp_response}
                        >
                            RSVP to this event
                            {rsvpMessage && <p>You're going!</p>}
                        </button>
                    ) : (
                        <p className="text-center text-gray-400 text-sm mt-6">
                            <span onClick={() => navigate('/login')} className="text-pink-500 cursor-pointer hover:underline">Login</span> to RSVP to this event
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}


export default EventDetail;