// import React, { useEffect, useState, useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { getTasks, createTask, updateTask, deleteTask } from '../../utils/api';
// import Navbar from '../Navbar/Navbar';
// import EditTaskModal from './EditTask';
// import ViewTaskModal from './ViewTask';

// const TaskBoard = () => {
//   const { logout } = useContext(AuthContext);
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({ title: '', description: '' });
//   const [search, setSearch] = useState('');
//   const [sort, setSort] = useState('Recent');
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const res = await getTasks();
//       console.log(res.data)
//       setTasks(res.data);
//     };
//     fetchTasks();
//   }, []);

//   const addTask = async (e) => {
//     e.preventDefault();
//     const res = await createTask(newTask);
//     setTasks([...tasks, res.data]);
//     setNewTask({ title: '', description: '' });
//   };

//   const handleStatusChange = async (taskId, newStatus) => {
//     const taskToUpdate = tasks.find(task => task._id === taskId);
//     const updatedTask = { ...taskToUpdate, status: newStatus };
//     const res = await updateTask(taskId, updatedTask);
//     setTasks(tasks.map(task => (task._id === taskId ? res.data : task)));
//   };

//   const handleDelete = async (taskId) => {
//     await deleteTask(taskId);
//     setTasks(tasks.filter(task => task._id !== taskId));
//   };

//   const handleSearch = (e) => setSearch(e.target.value);

//   const handleSort = (e) => setSort(e.target.value);

//   const openEditModal = (task) => {
//     setSelectedTask(task);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setSelectedTask(null);
//     setIsEditModalOpen(false);
//   };

//   const saveTask = async (editedTask) => {
//     const res = await updateTask(editedTask._id, editedTask);
//     setTasks(tasks.map(task => (task._id === editedTask._id ? res.data : task)));
//     closeEditModal();
//   };

//   const openViewModal = (task) => {
//     setSelectedTask(task);
//     setIsViewModalOpen(true);
//   };

//   const closeViewModal = () => {
//     setSelectedTask(null);
//     setIsViewModalOpen(false);
//   };

//   const filteredTasks = tasks.filter(task => 
//     task.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const sortedTasks = filteredTasks.sort((a, b) => {
//     if (sort === 'Recent') {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     } else {
//       return new Date(a.createdAt) - new Date(b.createdAt);
//     }
//   });

//   const renderTasks = (status) => {
//     const statusFilteredTasks = sortedTasks.filter(task => task.status === status);
//     return statusFilteredTasks.map(task => (
//       <div key={task._id} className="bg-blue-100 p-4 mb-4 rounded shadow">
//         <h3 className="font-bold">{task.title}</h3>
//         <p>{task.description}</p>
//         <p className="text-sm">Created at: {new Date(task.createdAt).toLocaleString()}</p>
//         <div className="flex justify-between mt-4">
//           <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//           <button onClick={() => openEditModal(task)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
//           <button onClick={() => openViewModal(task)} className="bg-green-500 text-white px-2 py-1 rounded">View Details</button>
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <div className="p-6">
//       <Navbar />
//       <div className="mt-10 flex justify-between items-center mb-6">
//         <form onSubmit={addTask} className="flex space-x-4">
//           <input
//             type="text"
//             placeholder="Title"
//             value={newTask.title}
//             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//             required
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={newTask.description}
//             onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//             className="p-2 border rounded"
//           />
//           <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
//         </form>
//       </div>
//       <div className='flex mb-5 justify-between'>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={handleSearch}
//           className="p-2 border rounded"
//         />
//         <div className="flex items-center">
//           <label className="mr-2">Sort By:</label>
//           <select value={sort} onChange={handleSort} className="p-2 border rounded">
//             <option value="Recent">Recent</option>
//             <option value="Oldest">Oldest</option>
//           </select>
//         </div>
//       </div>
//       <div className="grid grid-cols-3 gap-4">
//         <div>
//           <h2 className="text-center font-bold mb-4">TODO</h2>
//           {renderTasks('To Do')}
//         </div>
//         <div>
//           <h2 className="text-center font-bold mb-4">IN PROGRESS</h2>
//           {renderTasks('IN PROGRESS')}
//         </div>
//         <div>
//           <h2 className="text-center font-bold mb-4">DONE</h2>
//           {renderTasks('DONE')}
//         </div>
//       </div>
//       <EditTaskModal
//         isOpen={isEditModalOpen}
//         onClose={closeEditModal}
//         task={selectedTask}
//         onSave={saveTask}
//       />
//       <ViewTaskModal
//         isOpen={isViewModalOpen}
//         onClose={closeViewModal}
//         task={selectedTask}
//       />
//     </div>
//   );
// };

// export default TaskBoard;
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../../utils/api';
import Navbar from '../Navbar/Navbar';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const TaskBoard = () => {
  const { logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Recent');

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await getTasks();
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    const res = await createTask(newTask);
    setTasks([...tasks, res.data]);
    setNewTask({ title: '', description: '' });
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const taskToUpdate = tasks.find(task => task._id === taskId);
    if (taskToUpdate.status !== newStatus) {
      const updatedTask = { ...taskToUpdate, status: newStatus };
      const res = await updateTask(taskId, updatedTask);
      setTasks(tasks.map(task => (task._id === taskId ? res.data : task)));
    }
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const handleSort = (e) => setSort(e.target.value);

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === 'Recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  const renderTasks = (status) => {
    const statusFilteredTasks = sortedTasks.filter(task => task.status === status);
    return statusFilteredTasks.map(task => (
      <TaskCard key={task._id} task={task} onStatusChange={handleStatusChange} onDelete={handleDelete} />
    ));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <Navbar />
        <div className="mt-10 flex justify-between items-center mb-6">
          <form onSubmit={addTask} className="flex space-x-4">
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
          </form>
        </div>
        <div className='flex mb-5 justify-between'>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="p-2 border rounded"
          />
          <div className="flex items-center">
            <label className="mr-2">Sort By:</label>
            <select value={sort} onChange={handleSort} className="p-2 border rounded">
              <option value="Recent">Recent</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Column title="TODO" status="To Do" renderTasks={renderTasks} onStatusChange={handleStatusChange} />
          <Column title="IN PROGRESS" status="IN PROGRESS" renderTasks={renderTasks} onStatusChange={handleStatusChange} />
          <Column title="DONE" status="DONE" renderTasks={renderTasks} onStatusChange={handleStatusChange} />
        </div>
      </div>
    </DndProvider>
  );
};

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const history = useNavigate();
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleEdit = () => {
    history(`/edit/${task._id}`);
  };

  const handleView = () => {
    history(`/view/${task._id}`);
  };

  return (
    <div ref={drag} className={`bg-blue-100 p-4 mb-4 rounded shadow ${isDragging ? 'opacity-50' : ''}`}>
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm">Created at: {new Date(task.createdAt).toLocaleString()}</p>
      <div className="flex justify-between mt-4">
        <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        <button onClick={handleEdit} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
        <button onClick={handleView} className="bg-green-500 text-white px-2 py-1 rounded">View Details</button>
      </div>
    </div>
  );
};

const Column = ({ title, status, renderTasks, onStatusChange }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => onStatusChange(item.id, status),
  });

  return (
    <div ref={drop}>
      <h2 className="text-center font-bold mb-4">{title}</h2>
      {renderTasks(status)}
    </div>
  );
};

export default TaskBoard;
