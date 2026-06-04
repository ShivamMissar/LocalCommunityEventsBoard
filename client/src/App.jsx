import { Routes, Route } from 'react-router-dom';
import './App.css';


import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<p>Home</p>} />
      <Route path="/login" element={<p>Login</p>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<p>Dashboard</p>} />
      <Route path="/create" element={<p>Create Event</p>} />
      <Route path="/events/:id" element={<p>Single Event</p>} />
    </Routes>
  )
}

export default App
