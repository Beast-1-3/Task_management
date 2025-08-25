import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {
  const authState = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? 'add' : 'update';
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({ description: '' });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = mode === 'add' ? 'Add Task' : 'Update Task';
  }, [mode]);

  useEffect(() => {
    if (mode === 'update') {
      const config = {
        url: `/tasks/${taskId}`,
        method: 'get',
        headers: { Authorization: authState.token },
      };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ description: data.task.description });
      });
    }
  }, [mode, authState, taskId, fetchData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({ description: task.description });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields('task', formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = {
      url: mode === 'add' ? '/tasks' : `/tasks/${taskId}`,
      method: mode === 'add' ? 'post' : 'put',
      data: formData,
      headers: { Authorization: authState.token },
    };

    fetchData(config).then(() => navigate('/'));
  };

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm flex items-center ${formErrors[field] ? 'block' : 'hidden'}`}>
      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
      {formErrors[field]}
    </p>
  );

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        <form
          className="relative w-[95%] max-w-[600px] glassmorphism-task text-white shadow-2xl rounded-3xl p-10 border border-white/20"
          onSubmit={handleSubmit}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-3xl z-10">
              <Loader />
            </div>
          )}

          <div className="flex flex-col items-center mb-8">
            <span className="mb-2">
              <svg className="w-12 h-12 text-blue-400 animate-pulse drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="rgba(59,130,246,0.1)" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l2 2" />
              </svg>
            </span>
            <h2 className="text-3xl font-extrabold text-center mb-2 tracking-tight">
              {mode === 'add' ? 'Add New Task' : 'Edit Task'}
            </h2>
            <p className="text-gray-300 text-center text-base">
              {mode === 'add' ? 'Create a new task and boost your productivity!' : 'Update your task details below.'}
            </p>
          </div>

          <div className="mb-8">
            <label htmlFor="description" className="block text-white mb-2 font-semibold text-lg">
              Task Description
            </label>
            <Textarea
              name="description"
              id="description"
              value={formData.description}
              placeholder="Write your task here..."
              onChange={handleChange}
              className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/10 text-gray-100 placeholder-gray-400 ${
                formErrors.description ? 'border-pink-500' : 'border-gray-400'
              }`}
              rows={5}
              maxLength={1200}
            />
            {fieldError('description')}
            <div className="text-right text-xs text-gray-400 mt-1">
              {formData.description.length}/1200 characters
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white px-7 py-3 rounded-xl font-bold shadow-lg transform transition hover:scale-105 active:scale-95 duration-200"
            >
              {mode === 'add' ? 'Add Task' : 'Update Task'}
            </button>

            <button
              type="button"
              className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-800 hover:to-gray-600 text-white px-7 py-3 rounded-xl font-bold shadow-lg transform transition hover:scale-105 active:scale-95 duration-200"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>

            {mode === 'update' && (
              <button
                type="button"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-600 hover:to-yellow-400 text-white px-7 py-3 rounded-xl font-bold shadow-lg transform transition hover:scale-105 active:scale-95 duration-200"
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>
      <style>{`
        .glassmorphism-task {
          background: rgba(30, 41, 59, 0.85);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 1.5rem;
          border: 1.5px solid rgba(255, 255, 255, 0.22);
          transition: box-shadow 0.3s, background 0.3s;
        }
      `}</style>
    </MainLayout>
  );
};

export default Task;
