import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validateManyFields from '../validations';
import Input from './utils/Input';
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from '../redux/actions/authActions';
import Loader from './utils/Loader';

const LoginForm = ({ redirectUrl }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const authState = useSelector(state => state.authReducer);
  const { loading, isLoggedIn } = authState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [isLoggedIn, redirectUrl, navigate]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
  };

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-500 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
      {formErrors[field]}
    </p>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto my-16 max-w-[400px] rounded-xl p-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-center text-xl font-semibold text-cyan-400 mb-6">
            Welcome ! Please log in
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-300 after:content-['*'] after:ml-0.5 after:text-red-500">
              Email
            </label>
            <Input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              placeholder="youremail@domain.com"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {fieldError("email")}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="text-gray-300 after:content-['*'] after:ml-0.5 after:text-red-500">
              Password
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="Your password.."
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {fieldError("password")}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition"
          >
            Submit
          </button>

          {/* Link */}
          <p className="pt-4 text-center text-gray-300 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-400 hover:underline">
              Signup here
            </Link>
          </p>
        </>
      )}
    </form>
  );
};

export default LoginForm;
