import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {googleSignIn}=useAuth();
    const axiosPublic=useAxiosPublic();
    const navigate=useNavigate();

    const handleGoogleSignIn=()=>{
googleSignIn()
.then(result=>{
    console.log(result);
    const userInfo={
        email:result.user?.email,
        name:result.user?.displayName
    };
    axiosPublic.post('/users',userInfo)
    .then(res=>{
        console.log(res.data);
        navigate("/")
    })
}
)
    }
    return (
        <div>
            <div className="divider"></div>
            <div>
                <button className="flex gap-2 items-center mx-auto py-2 btn-accent btn" onClick={handleGoogleSignIn}><FaGoogle></FaGoogle> LogIn with Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;