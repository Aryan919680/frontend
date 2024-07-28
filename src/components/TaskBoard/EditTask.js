// components/EditTask/EditTask.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTask, getTasks } from '../../utils/api';

const EditTask = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', status: '' });

  useEffect(() => {
    const fetchTask = async () => {
      const res = await getTasks();
      const taskToEdit = res.data.find(task => task._id === id);
      setTask(taskToEdit);
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(id, task);
    history('/tasks');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          required
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        >
          <option value="To Do">To Do</option>
          <option value="IN PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default EditTask;
