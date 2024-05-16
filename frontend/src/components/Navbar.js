import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    return (<>
        <nav className="w-[180px] h-full text-white flex flex-col">
            <Link to="/feed">
                <div className="flex items-center pb-6 text-slate-300 hover:text-slate-50 transition-all duration-300">
                    <div className="flex items-center justify-center w-12">
                        <IoMdHome size={18}></IoMdHome>
                    </div>
                    <div className="flex items-center justify-start">Home</div>
                </div>
            </Link>
            <Link to="/feed">
                <div className="flex items-center py-3 text-slate-300 hover:text-white transition-all duration-300">
                    <div className="flex items-center justify-center w-12">
                        <FaUser size={16}></FaUser>
                    </div>
                    <div className="flex items-center justify-start">Profile</div>
                </div>
            </Link>
            <Link className="mt-auto" to="/login">
                <div className="flex items-center py-3 text-slate-300 hover:text-white font-semibold transition-all duration-300 ">
                    <div className="bg-[#9c2b2b] flex pl-4 pr-6 py-2 gap-2 rounded-md">
                        <div className="flex items-center justify-center w-6 -translate-x-0.5">
                            <TbLogout2 size={16} fontWeight={700}></TbLogout2>
                        </div>
                        <div className="flex items-center justify-start">Logout</div>
                    </div>
                </div>
            </Link>
        </nav>
    </>);
}

export default Navbar;