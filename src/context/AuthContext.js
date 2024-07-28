// import React, { createContext, useReducer, useEffect } from 'react';
// import api, { loginUser, registerUser } from '../utils/api';
// import setAuthToken from '../utils/setAuthToken';

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   token: localStorage.getItem('token')
// };

// const AuthContext = createContext(initialState);

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN_SUCCESS':
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload.user,
//         token: action.payload.token
//       };
//     case 'LOGOUT':
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//         token: null
//       };
//     default:
//       return state;
//   }
// };

// const decodeJWT = (token) => {
//   if (!token) return null;

//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split('')
//       .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//       .join('')
//   );

//   return JSON.parse(jsonPayload);
// };

// const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get('token');
//     console.log('Received token from URL:', token);

//     if (token) {
//       console.log('Setting token in localStorage and auth headers');
//       localStorage.setItem('token', token);
//       setAuthToken(token);
//       const decoded = decodeJWT(token);
//       console.log('Decoded token:', decoded);
//       dispatch({
//         type: 'LOGIN_SUCCESS',
//         payload: { user: decoded.user, token }
//       });
//       console.log('Redirecting to /tasks');
//       window.location.href = '/tasks'; // Redirect to tasks after setting token
//     } 
//     //else if (state.token) {
//     //   console.log('Using existing token from state');
//     //   setAuthToken(state.token);
//     //   const decoded = decodeJWT(state.token);
//     //   dispatch({
//     //     type: 'LOGIN_SUCCESS',
//     //     payload: { user: decoded.user, token: state.token }
//     //   });
//     }
//   , [state.token]);

//   const login = async (userData) => {
//     try {
//       const res = await loginUser(userData);
//       const { token } = res.data;
//       localStorage.setItem('token', token);
//       setAuthToken(token);
//       const decoded = decodeJWT(token);
//       dispatch({
//         type: 'LOGIN_SUCCESS',
//         payload: { user: decoded.user, token }
//       });
//       return true;
//     } catch (err) {
//       console.error('Login error', err.response.data);
//       return false;
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const res = await registerUser(userData);
//       const { token } = res.data;
//       localStorage.setItem('token', token);
//       setAuthToken(token);
//       const decoded = decodeJWT(token);
//       dispatch({
//         type: 'LOGIN_SUCCESS',
//         payload: { user: decoded.user, token }
//       });
//       return true;
//     } catch (err) {
//       console.error('Register error', err.response.data);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setAuthToken(null);
//     dispatch({ type: 'LOGOUT' });
//   };

//   return (
//     <AuthContext.Provider value={{ ...state, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };

import React, { createContext, useReducer, useEffect } from 'react';
import api, { loginUser, registerUser } from '../utils/api';
import setAuthToken from '../utils/setAuthToken';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token')
};

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
};

const decodeJWT = (token) => {
  if (!token) return null;

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload);
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log('Received token from URL:', token);

    if (token) {
      console.log('Setting token in localStorage and auth headers');
      localStorage.setItem('token', token);
      setAuthToken(token);
      const decoded = decodeJWT(token);
      console.log('Decoded token:', decoded);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: decoded.user, token }
      });

      // Delay the redirection to ensure the state is updated
      setTimeout(() => {
        console.log('Redirecting to /tasks');
        window.location.href = '/tasks';
      }, 100);
    } else if (state.token) {
      console.log('Using existing token from state');
      setAuthToken(state.token);
      const decoded = decodeJWT(state.token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: decoded.user, token: state.token }
      });
    }
  }, [state.token]);

  const login = async (userData) => {
    try {
      const res = await loginUser(userData);
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      const decoded = decodeJWT(token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: decoded.user, token }
      });
      return true;
    } catch (err) {
      console.error('Login error', err.response.data);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const res = await registerUser(userData);
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      const decoded = decodeJWT(token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: decoded.user, token }
      });
      return true;
    } catch (err) {
      console.error('Register error', err.response.data);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
