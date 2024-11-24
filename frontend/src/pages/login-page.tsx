import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HostContext from "../HostContext";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const hostURL = useContext(HostContext);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody = {
      username: username,
      password: password,
    };

    fetch(`${hostURL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem('username', username);
        navigate("/quizzes");
      })
      .catch((error) => {
        // TODO: Display error in the UI.
        console.log("Error:");
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-purple-50 rounded-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h1 className="mb-2 text-2xl font-bold text-purple-700">Quizzard</h1>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Login</h2>
        <p className="mb-6 text-sm text-gray-600">
          Login to your account to access our language learning platform.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 text-white transition duration-300 bg-purple-600 rounded-md hover:bg-purple-700"
          >
            Login
          </motion.button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
