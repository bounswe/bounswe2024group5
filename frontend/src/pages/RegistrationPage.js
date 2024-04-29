import InputBox from "../components/InputBox";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

function RegistrationPage() {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const register = () => {

        if (password !== confirmPassword) {
            console.error("Passwords do not match!");
            return;
        }

        const requestBody = {
            name: name,
            surname: surname,
            email: email,
            username: username,
            password: password,
        };
    
        console.log("Attempting to register with:\n", requestBody);

        fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": JSON.stringify(requestBody).length.toString(),
                "Host": "localhost:8080",
            },
            body: JSON.stringify(requestBody)
        }).then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
            if (response.message === "User registered successfully") {
                navigate("/feed");
            }
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <>
            <div className="flex flex-col sm:w-full max-w-[360px] bg-[#111927CC] 
            rounded-2xl p-6 shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.25)] backdrop-blur w-5/6
            ">
                <p className="text-[28px] text-white text-center mb-6 tracking-tight leading-8 font-medium">Register to Melodify</p>
                <div className="flex flex-col gap-4 mb-6">
                    <InputBox placeholder={"Name"} onChange={(e) => {setName(e.target.value);}}></InputBox>
                    <InputBox placeholder={"Surname"} onChange={(e) => {setSurname(e.target.value);}}></InputBox>
                    <InputBox placeholder={"Email"} onChange={(e) => {setEmail(e.target.value);}}></InputBox>
                    <InputBox placeholder={"Username"} onChange={(e) => {setUsername(e.target.value);}}></InputBox>
                    <InputBox placeholder={"Password"} onChange={(e) => {setPassword(e.target.value);}}></InputBox>
                    <InputBox placeholder={"Confirm Password"} onChange={(e) => {setConfirmPassword(e.target.value);}}></InputBox>
                </div>
                <div className="flex flex-col gap-3">
                    <button onClick={register} className="bg-[#0090FF] text-white leading-6 font-medium py-2 px-5 rounded-lg text-center border-2 border-solid border-transparent transition-all duration-200 hover:bg-[#0588F0] hover:cursor-pointer">Sign Up</button>
                    <button onClick={() => {navigate("/login")}} className="bg-[#0090FF] text-white leading-6 font-medium py-2 px-5 rounded-lg text-center border-2 border-solid border-transparent transition-all duration-200 hover:bg-[#0588F0] hover:cursor-pointer">Go to Login Page</button>
                </div>
            </div>
        </>
    );
}

export default RegistrationPage;