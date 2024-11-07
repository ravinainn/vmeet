import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import axios from "axios";
import { Link, redirect, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hola");
    try {
      console.log("abcd");
      let response;
      if (isLogin) {
        response = await axios.post("http://localhost:8083/api/users/login", {
          username,
          password,
        });
      } else {
        response = await axios.post(
          "http://localhost:8083/api/users/register",
          {
            username,
            email,
            password,
          }
        );
      }
      //   console.log("Response:", response.data);
      localStorage.setItem("userId", response.data.id);

      console.log("success");
      setSuccess("Operation successful");
      navigate("/dashboard");
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data || "An error occurred");
      setSuccess("");
    }
  };
  return (
    <div className="flex">
      <div className="w-1/2 h-screen bg-primary flex justify-center items-center ">
        <div className="bg-white p-10 w-4/6 flex flex-col gap-2 rounded-md">
          <div className="flex justify-between items-center mb-8">
            <img className="w-20" src={logo} alt="" />
            <h2 className="flex-1 text-2xl font-bold text-center">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {!isLogin && (
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-4 text-center">
            {error && (
              <p className="text-sm text-red-500 font-normal">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-600 font-normal">{success}</p>
            )}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:text-blue-400"
            >
              {isLogin
                ? "Need an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen"></div>
    </div>
  );
};

export default Login;
