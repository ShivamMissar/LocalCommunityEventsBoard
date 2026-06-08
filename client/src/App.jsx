import { Routes, Route } from 'react-router-dom';
import './App.css';


import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<p>Dashboard</p>} />
      <Route path="/create" element={<p>Create Event</p>} />
      <Route path="/events/:id" element={<p>Single Event</p>} />
    </Routes>
  )
}

export default App
