import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auths/AuthProvider";
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../Hooks/useCart";
import useAdmin from "../../Hooks/useAdmin";



const Navbar = () => {
  const { user, logout, setLoading } = useContext(AuthContext)
  const [isAdmin]=useAdmin()
  const [cart]=useCart()
  // console.log(user)
  const handleLogOut = () => {
    logout()
      .then(() => {
        console.log("loggedOut");
        setLoading(false);
      })
      .catch(error => { console.log(error) })
  }
  const navOptions = <>

    <li><Link to={"/"}>Home</Link></li>
    <li><Link to={"/menu"}>Our Menu</Link></li>
    <li><Link to={"/order/salad"}>Order Food</Link></li>
    <li><Link to={"/register"}>Register</Link></li>
    <li><Link to={"/secret"}>Secret</Link></li>
    <li><Link to={"/dashboard/cart"}><button className="btn btn-sm">
 <FaCartShopping></FaCartShopping>
  <div className="badge badge-secondary">{cart.length}</div>
</button></Link></li>
    { user ? 
    <> <Link className="mr-4" onClick={handleLogOut} >LogOut</Link> <img src={user.photoURL} className="w-10 rounded-full" alt="phto" /><p>{isAdmin ? "Admin" : "User"}</p> </> 
    : <> <li><Link to={"/login"}>LogIn</Link></li> </>}
   
  </>
  return (<>
    <div className="navbar fixed z-50 bg-opacity-60 max-w-screen-xl bg-amber-600 text-white">
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-amber-600 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {navOptions}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Bistro Boss</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal items-center px-1">
          {navOptions}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
    <div className="h-[79px] bg-red-600"></div>
  </>
  );
};

export default Navbar;