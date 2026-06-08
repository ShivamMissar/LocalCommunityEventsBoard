import { useEffect, useState } from "react";
import axios from "axios";



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

        <div>
            <h1>Homepage</h1>
            <div>
                {events.map((event) => (
                    <div key={event.id}>
                        <h2>{event.title}</h2>
                        <p>{event.location}</p>
                        <p>{event.date}</p>
                    </div>
                ))}
            </div>


        </div>
    )
}


export default Home;