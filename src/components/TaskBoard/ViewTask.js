// components/ViewTask/ViewTask.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTasks } from '../../utils/api';

const ViewTask = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', status: '' });

  useEffect(() => {
    const fetchTask = async () => {
      const res = await getTasks();
      const taskToView = res.data.find(task => task._id === id);
      setTask(taskToView);
    };
    fetchTask();
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Task Details</h2>
      <div className="space-y-4">
        <div>
          <label className="font-bold">Title:</label>
          <p className="p-2 border rounded w-full">{task.title}</p>
        </div>
        <div>
          <label className="font-bold">Description:</label>
          <p className="p-2 border rounded w-full">{task.description}</p>
        </div>
        <div>
          <label className="font-bold">Status:</label>
          <p className="p-2 border rounded w-full">{task.status}</p>
        </div>
        <div>
          <label className="font-bold">Created At:</label>
          <p className="p-2 border rounded w-full">{new Date(task.createdAt).toLocaleString()}</p>
        </div>
        <button onClick={() => history('/tasks')} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
      </div>
    </div>
  );
};

export default ViewTask;
