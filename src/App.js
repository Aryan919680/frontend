import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskBoard from './components/TaskBoard/TaskBoard';
import EditTask from './components/TaskBoard/EditTask';
import ViewTask from './components/TaskBoard/ViewTask';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/tasks" element={<PrivateRoute><TaskBoard /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><EditTask /></PrivateRoute>}  />
          <Route path="/view/:id" element={<PrivateRoute><ViewTask /></PrivateRoute>}  />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
