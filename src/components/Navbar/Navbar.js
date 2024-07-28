import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/tasks">
         <h1 className='text-white text-3xl'>Task Management App</h1>
        </Link>
      </div>
      <div>
        {user ? (
          <>
            <button
              onClick={logout}
              className="bg-white text-blue-600 px-4 py-2 rounded mr-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="bg-white text-blue-600 px-4 py-2 rounded mr-2">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-white text-blue-600 px-4 py-2 rounded">
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
