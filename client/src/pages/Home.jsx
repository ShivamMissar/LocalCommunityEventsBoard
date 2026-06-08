import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";



function Home() {
    const [events, setEvents] = useState([]);
  useEffect(() => {
  async function fetchEvents() {
    try {
      const response = await axios.get('http://localhost:5000/events');
      setEvents(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  fetchEvents();
}, []);
  

return (
 <div className="min-h-screen" style={{ background: '#fff5f7' }}>
  <Navbar />
  
  {/* Hero */}
  <div className="text-center py-20 px-6"
    style={{ background: 'linear-gradient(135deg, #f953c6 0%, #b91d73 50%, #f9a825 100%)' }}
  >
    <h1 className="text-5xl font-extrabold text-white mb-4">Discover Local Events</h1>
    <p className="text-white/80 text-lg mb-8">Find and join events happening in your community</p>
    <button className="bg-white text-pink-500 font-bold px-8 py-3 rounded-full hover:opacity-90 transition-all">
      Browse Events ↓
    </button>
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
        </div>
      ))}
    </div>
  </div>
</div>
)




}


export default Home;