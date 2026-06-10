import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function CreateEvent() {
    const [titleName, setTitleName] = useState('');
    const [descriptionofEvent, setDescriptionOfEvent] = useState('');
    const [locationOfEvent, setLocationOfEvent] = useState('');
    const [categoryOfEvent, setCategoryOfEvent] = useState('');
    const [dateOfEvent, setDateOfEvent] = useState('');
    const [imageUrlOfEvent, setImageUrlOfEvent] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    async function handleSubmit() {
        
        try {

            const response = await axios.post('http://localhost:5000/events', {
            title: titleName, description: descriptionofEvent, category: categoryOfEvent, location: locationOfEvent, date: dateOfEvent, image_url: imageUrlOfEvent
        }, {
            headers: { Authorization: `Bearer ${token}` }
            
        });
        setSuccessMessage("Event successfully created"); 
        navigate('/');
        } catch (err) {
            setErrorMessage("Something went wrong, try again"); 
            console.error(err);
        }
        
        
    }

    return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #f953c6 0%, #b91d73 50%, #f9a825 100%)' }}
    >
      <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl flex flex-col gap-5">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">Create Account</h1>
        <p className="text-center text-gray-400 text-sm -mt-3">Bring your community together!</p>

        

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Event Name</label>
          <input
            type="text"
            value={titleName}
            onChange={(e) => setTitleName(e.target.value)}
            placeholder="Summer BBQ"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 transition-colors text-gray-800"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Description of the event</label>
          <input
            type="text"
            value={descriptionofEvent}
            onChange={(e) => setDescriptionOfEvent(e.target.value)}
            placeholder="Going to be a nice BBQ at the local park"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 transition-colors text-gray-800"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Location</label>
          <input
            type="text"
            value={locationOfEvent}
            onChange={(e) => setLocationOfEvent(e.target.value)}
            placeholder="Local Park - Nottingham"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 transition-colors text-gray-800"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">category</label>
          <input
            type="text"
            value={categoryOfEvent}
            onChange={(e) => setCategoryOfEvent(e.target.value)}
            placeholder="#BBQ #Summer"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 transition-colors text-gray-800"
          />
        </div>

         <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Date of event</label>
          <input
            type="date"
            value={dateOfEvent}
            onChange={(e) => setDateOfEvent(e.target.value)}
            placeholder="29th Of May"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 transition-colors text-gray-800"
          />
        </div>

         <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Images to support the event</label>
          <input
            type="text"
            value={imageUrlOfEvent}
            onChange={(e) => setImageUrlOfEvent(e.target.value)}
            placeholder="Enter the URL of the image to display"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 transition-colors text-gray-800"
          />
        </div>


    

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #f953c6, #b91d73)' }}
        >
          Create Event
        </button>

       
      </div>
    </div>
  )

}

export default CreateEvent;