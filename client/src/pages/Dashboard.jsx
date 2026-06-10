import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";


function Dashboard() {

    const [events, setEvents] = useState([]);


    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    //editing the event
    const [editingId, setEditingId] = useState(null);


    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editLocation, setEditLocation] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editImg, setEditImg] = useState('');


    function startEdit(event) {
        setEditingId(event.id);
        setEditTitle(event.title);
        setEditDescription(event.description);
        setEditLocation(event.location);
        setEditCategory(event.category);
        setEditDate(event.date);
        setEditImg(event.image_url);
    }



    function cancelEdit() {
        setEditingId(null);
        setEditTitle('');
        setEditDescription('');
        setEditDate('');
        setEditImg('');
        setEditLocation('');
        setEditCategory('');
    }

    function getCategoryGradient(category) {
        if (category === '#Food') return 'linear-gradient(135deg, #f953c6, #b91d73)';
        if (category === '#Sport') return 'linear-gradient(135deg, #4facfe, #00f2fe)';
        if (category === '#Music') return 'linear-gradient(135deg, #43e97b, #38f9d7)';
        if (category === '#Charity') return 'linear-gradient(135deg, #fa709a, #fee140)';
        return 'linear-gradient(135deg, #f953c6, #f9a825)';
    }

    useEffect(() => {
        fetchUserEvents();
    }, []);

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


    async function saveEdit(id) {
        try {
            await axios.put(`http://localhost:5000/events/${id}`, {
                title: editTitle,
                description: editDescription,
                category: editCategory,
                location: editLocation,
                date: editDate,
                image_url: editImg
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // reset editing state
            setEditingId(null);
            // refresh events
            fetchUserEvents();
            // navigate or re-fetch
        } catch (err) {
            console.error(err);
        }
    }

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
                    <h1 className="text-5xl font-extrabold text-white mb-4">Welcome back {name} 👋</h1>
                    <p className="text-white/80 text-lg mb-8">Here are the events you've created</p>

                    <button
                        onClick={() => navigate('/create')}
                        className="bg-white text-pink-600 font-bold px-8 py-3 rounded-full hover:opacity-90 transition-all mt-4"
                    >
                        + Create New Event
                    </button>
                </div>
                {/* Events grid */}
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div key={event.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                                {editingId === event.id ? (
                                    // edit mode - just inputs, no gradient header
                                    <div className="p-6">
                                        <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm mb-2" />
                                        <input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm mb-2" />
                                        <input value={editLocation} onChange={(e) => setEditLocation(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm mb-2" />
                                        <input value={editCategory} onChange={(e) => setEditCategory(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm mb-2" />
                                        <input type="date" value={editDate.slice(0, 10)} onChange={(e) => setEditDate(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm mb-2" />
                                        <div className="flex gap-3 mt-2">
                                            <button onClick={() => saveEdit(event.id)} className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">Save</button>
                                            <button onClick={cancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-semibold">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    // view mode - gradient header + content
                                    <>
                                        <div className="h-16 flex items-center px-6"
                                            style={{ background: getCategoryGradient(event.category) }}
                                        >
                                            <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full">{event.category}</span>
                                        </div>
                                        <div className="p-6">
                                            <h2 className="text-lg font-bold text-gray-800">{event.title}</h2>
                                            <p className="text-gray-400 text-sm mt-1">📍 {event.location}</p>
                                            <p className="text-gray-400 text-sm">📅 {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                            <p className="text-gray-600 text-sm mt-3 line-clamp-2">{event.description}</p>
                                            {new Date(event.date) > new Date() ? (
                                                <div className="flex gap-3 mt-4">
                                                    <button onClick={() => deleteEvent(event.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Delete</button>
                                                    <button onClick={() => startEdit(event)} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Update</button>
                                                </div>
                                            ) : (
                                                <p className="text-gray-400 text-xs mt-4 italic">This event has passed</p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>

                        ))}
                    </div>

                </div>
            </div>

        </div>
    )
}


export default Dashboard;