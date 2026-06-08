import { useNavigate } from 'react-router-dom';

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
           <h1 className="font-extrabold text-xl cursor-pointer text-white" onClick={() => navigate('/')}>
  EventBoard
</h1>
            <div className="flex gap-4">
                {/* if token exists show Dashboard + Logout, otherwise show Login + Register */}
                {token ? (
                    <>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="border-2 border-white text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-pink-500 transition-all"
                        >
                            Dashboard
                        </button>

                           <button
                            onClick={() => navigate('/create')}
                            className="border-2 border-white text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-pink-500 transition-all"
                        >
                            Create Event
                        </button>
                        <button
                            onClick={handleLogout}
                           className="border-2 border-white text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-pink-500 transition-all">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => navigate('/login')}
                           className="border-2 border-white text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-pink-500 transition-all">
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                           className="border-2 border-white text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-pink-500 transition-all">
                            Register
                        </button>
                    </>
                )}


            </div>
        </nav>
    );
}

export default Navbar;

