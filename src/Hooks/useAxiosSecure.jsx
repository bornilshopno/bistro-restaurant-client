import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Pages/Auths/AuthProvider";

export const axiosSecure = axios.create({
    baseURL: "http://localhost:5000/"
})
const useAxiosSecure = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
       // console.log("request stopped by interceptor", token);
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        //do something with request error
        return Promise.reject(error);
    })


    axiosSecure.interceptors.response.use(function (response) {
        return response;
    },
        async (error) => {
            const status = error.response.status;
           // console.log('status error in interceptor', status);
            // for 401 and 403 error make the user logout
            if (status === 401 || status === 403) {
                await logout();
                navigate('/login')
            }
            return Promise.reject(error)
        }
    )

    return axiosSecure
};

export default useAxiosSecure;