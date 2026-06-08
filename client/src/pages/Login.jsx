import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    async function handleLogin() {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                email, password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', response.data.name);
            setSuccessMessage("Logging in Redirecting...");
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setErrorMessage('Incorrect email or password. Please try again.');
        }
    }
    return (

        <div className="min-h-screen flex items-center justify-center px-4"
            style={{ background: 'linear-gradient(135deg, #f953c6 0%, #b91d73 50%, #f9a825 100%)' }}
        >
            <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl flex flex-col gap-5">
                <h1 className="text-3xl font-extrabold text-gray-800 text-center">Login</h1>
                <p className="text-center text-gray-400 text-sm -mt-3">Welcome back, get logged to continue </p>

                {errorMessage && <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-xl">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-sm text-center bg-green-50 py-2 rounded-xl">{successMessage}</p>}

               

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 transition-colors text-gray-800"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••••••"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 transition-colors text-gray-800"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full py-3 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #f953c6, #b91d73)' }}
                >
                    Login
                </button>

                <p className="text-center text-sm text-gray-400">
                    Don't have a account?{' '}
                    <span onClick={() => navigate('/register')} className="text-pink-500 font-medium cursor-pointer hover:underline">
                        Register
                    </span>
                </p>
            </div>
        </div>

    )
}


export default Login;