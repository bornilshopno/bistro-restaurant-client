import { FaHome, FaShoppingCart } from "react-icons/fa";
import { FaBook, FaCalendar, FaEnvelope, FaList, FaPen, FaUsers, FaUtensils, } from "react-icons/fa6";

import { Link, NavLink, Outlet } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import useAdmin from "../../Hooks/useAdmin";


const Dashboard = () => {
    const[cart]=useCart();
    

    //TODO:get isAdmin value from the database
    const [isAdmin]=useAdmin();
    return (
        <div className="flex">
            <div className="w-56 min-h-screen bg-amber-400">
                <ul className="menu p-4">
                    { isAdmin ? 
                    <>
                    <li>
                        <NavLink to={"/dashboard/adminHome"}><FaHome />Admin Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/addItems"}><FaUtensils />Add Items</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/manageItems"}><FaList />Manage Items</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/manageBookings"}><FaBook /> Manage Bookings</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/users"}><FaUsers />All Users</NavLink>
                    </li>
                    </>:
                    <>
                    <li>
                        <NavLink to={"/dashboard/userHome"}><FaHome />User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/paymentHistory"}><FaCalendar />Payment History</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/addReview"}><FaPen />Add Review</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/cart"}><FaShoppingCart />MyCart ({cart.length})</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/bookings"}><FaList />My Booking</NavLink>
                    </li>
                    </>}
                    <div className="divider"></div>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/menu"}>Our Menu</Link></li>
                    <li><Link to={"/Contact"}><FaEnvelope></FaEnvelope> Contact</Link></li>
                    <li><Link to={"/order/salad"}>Order Food</Link></li>
                    <li><Link to={"/register"}>Register</Link></li>
                    <li><Link to={"/secret"}>Secret</Link></li>
                </ul>
            </div>
            <div className="flex-1">
             <div className="mx-4 border-4 border-amber-400 min-h-screen">
             <Outlet></Outlet>
             </div>
            </div>
        </div>
    );
};

export default Dashboard;
