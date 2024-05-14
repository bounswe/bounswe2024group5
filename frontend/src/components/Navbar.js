import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

function Navbar() {
    return (<>
        <nav className="w-[200px] h-screen absolute left-[180px] top-0 text-white flex flex-col">
            <Link to="/feed">
                <div className="flex items-center py-3 text-slate-300 hover:text-slate-50 transition-all duration-300">
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
            <Link className="mt-auto" to="/feed">
                <div className="flex items-center py-3 text-slate-300 hover:text-white transition-all duration-300">
                    <div className="flex items-center justify-center w-12 -translate-x-0.5">
                        <TbLogout2 size={16}></TbLogout2>
                    </div>
                    <div className="flex items-center justify-start">Logout</div>
                </div>
            </Link>
        </nav>
    </>);
}

export default Navbar;