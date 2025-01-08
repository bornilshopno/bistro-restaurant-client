import {
    createBrowserRouter
} from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Auths/Login";
import Register from "../Pages/Auths/Register";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Orders/Order/Order";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Components/Secret";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <h2>Error Page</h2>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/menu",
                element: <Menu></Menu>
            },
            {
                path: "/order/:category",
                element: <Order></Order>
            },
            {
                path: "/secret",
                element: <PrivateRoute><Secret></Secret></PrivateRoute>
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "/dashboard/cart",
                element: <Cart></Cart>
            },
            //admin routes
            {
                path: "users",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: "addItems",
                element: <AdminRoute><AddItems></AddItems></AdminRoute>
            }
        ]
    },

])

