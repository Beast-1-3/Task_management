import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import validateManyFields from "../validations";
import Input from "./utils/Input";
import Loader from "./utils/Loader";

const SignupForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("signup", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    fetchData({ url: "/auth/signup", method: "post", data: formData })
      .then(() => navigate("/login"))
      .catch((err) => console.log(err));
  };

  const fieldError = (field) =>
    formErrors[field] && (
      <p className="mt-1 text-pink-500 text-sm">
        <i className="fa-solid fa-circle-exclamation mr-2"></i>
        {formErrors[field]}
      </p>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto my-16 max-w-[500px] p-8 
        bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-center mb-6 text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Welcome, please sign up
          </h2>

          {/* Name */}
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-200 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              placeholder="Your name"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {fieldError("name")}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-200 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
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
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-200 mb-1">
              Password <span className="text-red-500">*</span>
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
            className="w-full py-2 mt-3 bg-gradient-to-r from-blue-500 to-purple-500 
              text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition-all"
          >
            Submit
          </button>

          {/* Login Link */}
          <div className="pt-4 text-center">
            <Link to="/login" className="text-blue-400 hover:underline">
              Already have an account? Login here
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default SignupForm;
