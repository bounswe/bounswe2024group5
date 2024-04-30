import InputBox from "../components/InputBox";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const login = () => {
    const requestBody = {
      username: username,
      password: password,
    };

    console.log("Attempting to login with:\n", requestBody);

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(requestBody).length.toString(),
        Host: "localhost:8080",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.message === "Login successful") {
          navigate("/feed");
        } else {
          setErrorMessage(response.message);
        }
      })
      .catch((error) => {
        setErrorMessage(error);
        console.error(error);
      });
  };

  return (
    <>
      <div
        className="flex flex-col sm:w-full max-w-[360px] bg-[#111927CC] 
            rounded-2xl p-6 shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.25)] backdrop-blur w-5/6
            "
      >
        <p className="text-[28px] text-white text-center mb-6 tracking-tight leading-8 font-medium">
          Login to Melodify
        </p>
        {errorMessage && ( // Conditionally render error message
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <div className="flex flex-col gap-4 mb-6">
          <InputBox
            placeholder={"Username"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></InputBox>
          <InputBox
            placeholder={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></InputBox>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={login}
            className="bg-[#0090FF] text-white leading-6 font-medium py-2 px-5 rounded-lg text-center border-2 border-solid border-transparent transition-all duration-200 hover:bg-[#0588F0] hover:cursor-pointer"
          >
            Sign In
          </button>
          <p className="text-white text-center mb-6">
            Don't have an account yet?{" "}
            <a href="/register" className="text-[#0090FF] hover:underline">
              Register here.
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
