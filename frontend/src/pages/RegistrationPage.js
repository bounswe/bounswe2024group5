import { useNavigate } from 'react-router-dom';
import InputBox from "../components/InputBox";

function RegistrationPage() {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col sm:w-full max-w-[360px] bg-[#111927CC] 
            rounded-2xl p-6 shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.25)] backdrop-blur w-5/6
            ">
                <p className="text-[28px] text-white text-center mb-6 tracking-tight leading-8 font-medium">Register to Melodify</p>
                <div className="flex flex-col gap-4 mb-6">
                    <InputBox placeholder={"Name"}></InputBox>
                    <InputBox placeholder={"Surname"}></InputBox>
                    <InputBox placeholder={"Email"}></InputBox>
                    <InputBox placeholder={"Password"}></InputBox>
                    <InputBox placeholder={"Confirm Password"}></InputBox>
                </div>
                <button className="bg-[#0090FF] text-white leading-6 font-medium py-2 px-5 rounded-lg text-center border-2 border-solid border-transparent transition-all duration-200 hover:bg-[#0588F0] hover:cursor-pointer">Sign Up</button>
                <p className="text-white text-center mt-4">
                    Already a member? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>Login from here.</span>
                </p>
            </div>
        </>
    );
}

export default RegistrationPage;