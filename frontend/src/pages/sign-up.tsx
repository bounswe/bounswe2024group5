import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HostContext from "../HostContext";
import { ProfileResponse } from "../types/profile";

export const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [englishProficiency, setEnglishProficiency] =
    useState<ProfileResponse["englishProficiency"]>("A1");
  const navigate = useNavigate();

  const hostURL = useContext(HostContext);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody = {
      username: username,
      name: firstName + lastName,
      email: email,
      password: password,
      englishProficiency: englishProficiency,
    };

    fetch(`${hostURL}/api/auth/register`, {
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
        console.log("Registration successfull.");
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", username);
        navigate("/");
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
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Set up your account
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Fill out the required fields to access our language learning platform.
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <select
            value={englishProficiency}
            onChange={(e) =>
              setEnglishProficiency(
                e.target.value as ProfileResponse["englishProficiency"]
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="A1">Beginner (A1)</option>
            <option value="A2">Elementary (A2)</option>
            <option value="B1">Intermediate (B1)</option>
            <option value="B2">Upper Intermediate (B2)</option>
            <option value="C1">Advanced (C1)</option>
            <option value="C2">Mastery (C2)</option>
          </select>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 text-white transition duration-300 bg-purple-600 rounded-md hover:bg-purple-700"
          >
            Continue
          </motion.button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
