import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: '/tasks', method: 'get', headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then((data) => setTasks(data.tasks || []));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (authState.isLoggedIn) fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: 'delete', headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg shadow-xl border border-white/20 rounded-2xl p-8 w-[90%] max-w-[700px]">
        {/* <h1 className="text-3xl font-bold text-center text-white mb-6">
          Welcome back, <span className="text-blue-400">{authState.user?.name || ''}</span>
        </h1> */}

        {loading ? (
          <Loader />
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-300">
            <p className="mb-4 text-lg">No tasks yet.</p>
            <Link
              to="/tasks/add"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-6 py-2 transition"
            >
              + Add Task
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-2">
              Your Tasks ({tasks.length})
            </h2>

            {tasks.map((task, index) => (
             <div
  key={task._id}
  className="relative bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-lg rounded-2xl p-5 flex items-start justify-between shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 border border-white/20"
>
  <div>
    <span className="block text-lg font-semibold text-white drop-shadow-md">Task {index + 1}</span>
    <p className="mt-2 text-gray-200 whitespace-pre-wrap">{task.description}</p>
  </div>

  <div className="flex gap-3 ml-4">
    <Tooltip text="Edit this task" position="top">
      <Link
        to={`/tasks/${task._id}`}
        className="w-10 h-10 flex items-center justify-center bg-green-500 hover:bg-green-600 rounded-full text-white shadow-lg transition-transform transform hover:scale-110"
      >
        <i className="fa-solid fa-pen"></i>
      </Link>
    </Tooltip>

    <Tooltip text="Delete this task" position="top">
      <button
        onClick={() => handleDelete(task._id)}
        className="w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-full text-white shadow-lg transition-transform transform hover:scale-110"
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </Tooltip>
  </div>

  {/* Subtle glowing background effect */}
  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-10 rounded-2xl blur-xl pointer-events-none"></div>
</div>

            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
