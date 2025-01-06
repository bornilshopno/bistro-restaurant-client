import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";



const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, setUser, setLoading, updateUserProfile } = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();//
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser)
        console.log(data.name, data.photoURL)
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            console.log("user pro ino updated");
            const userInfo = {
              name: data.name,
              email: data.email,
            }
            axiosPublic.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  Swal.fire({
                    title: "User Created Successfully",
                    showClass: {
                      popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
                    },
                    hideClass: {
                      popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
                    }
                  });
                  reset();
                  navigate("/");

                }
              })

          })
          .catch(error => { console.log(error) })
        setLoading(false)
      })

  }

  //console.log(watch("example")) // watch input value by passing the name of it

  return (
    <div>
      <Helmet>
        <title>BistroBoss || Register</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">SIGN UP</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Name" {...register("name", { required: true })} className="input input-bordered" required />
                {errors.name && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoURL</span>
                </label>
                <input type="text" placeholder="PhotoURL" {...register("photoURL", { required: true })} className="input input-bordered" required />
                {errors.photoURL && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" {...register("email", { required: true })} className="input input-bordered" required />
                {errors.email && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 8,
                  pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/
                })} className="input input-bordered" required />
                {errors.password?.type === 'required' && <span className="text-red-500">This field is required</span>}
                {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be of 6 characters</span>}
                {errors.password?.type === 'maxLength' && <span className="text-red-500">Password should not be more than 8 characters</span>}
                {errors.password?.type === 'pattern' && <span className="text-red-500">Password must contain one Uppercase one Lowercase and one Digit</span>}

              </div>
              <div className="form-control mt-6">
                <input type="submit" value="Sign UP" className="btn btn-primary" />

              </div>
            </form>
            <p className="text-center my-2">Already have an account? pls <span className="text-blue-700 font-semibold"><Link to={"/login"}>LogIn</Link></span></p>
            <SocialLogin />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;