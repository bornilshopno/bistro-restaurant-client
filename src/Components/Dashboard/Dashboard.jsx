import { FaHome, FaShoppingCart } from "react-icons/fa";
import { FaCalendar, FaEnvelope, FaList, FaPen, } from "react-icons/fa6";

import { Link, NavLink, Outlet } from "react-router-dom";
import useCart from "../../Hooks/useCart";


const Dashboard = () => {
    const[cart]=useCart();

    //TODO:get isAdmin value from the database
    const isAdmin= true;
    return (
        <div className="flex">
            <div className="w-56 min-h-screen bg-amber-400">
                <ul className="menu">
                    <li>
                        <NavLink to={"/dashboard/userHome"}><FaHome />User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/reservation"}><FaCalendar />Reservation</NavLink>
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
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
