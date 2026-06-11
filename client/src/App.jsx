import { Routes, Route } from 'react-router-dom';

import './App.css';


import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Dashboard from './pages/Dashboard';
import EventDetail from './pages/EventDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/create" element={<CreateEvent/>} />
      <Route path="/events/:id" element={<EventDetail/>} />
     
    </Routes>
  )
}

export default App
