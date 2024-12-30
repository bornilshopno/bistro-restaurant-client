import {
    createBrowserRouter
} from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Auths/Login";
import Register from "../Pages/Auths/Register";

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
                }]
        }
    ])

