
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  let history = useNavigate();
  const handleSubmit  = async (e) => {
    e.preventDefault();
    const status = await login({ email, password });
    
    if(status == true){
      history('/tasks');
    }else{
      alert("Login Failed")
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://backend-bz7f.onrender.com/auth/google';
  };
  return (
    <div>
        <Navbar />

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-600">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="-mt-px">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
          <div className="text-center">
            <p className="text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Signup
              </Link>
            </p>
            <button  onClick={handleGoogleLogin}
              type="button"
              className="w-full py-2 mt-4 text-blue-600 border border-blue-600 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
