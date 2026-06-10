import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/login');
    }

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

