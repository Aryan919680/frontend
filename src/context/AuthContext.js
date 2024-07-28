import React, { createContext, useReducer, useEffect } from 'react';
import api, { loginUser, registerUser } from '../utils/api';
import setAuthToken from '../utils/setAuthToken';
import { useNavigate } from 'react-router-dom';
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
  if (!token) {
    return null;
  }

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const history = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log("token:",token)
    if (token) {
      localStorage.setItem('token', token);
      setAuthToken(token);
      const decoded = decodeJWT(token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: decoded.user, token }
      });
     history('/tasks')
    } else if (state.token) {
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


