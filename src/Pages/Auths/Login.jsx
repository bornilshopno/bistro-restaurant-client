import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from './AuthProvider';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const { userLogin, loading, setLoading } = useContext(AuthContext);
    const navigate=useNavigate()
    const location=useLocation();
    const locs=location.state?.from?.pathname || "/";
    const captchaRef = useRef(null);
    const [disable, setDisable] = useState(true)
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        userLogin(email, password)
            .then(res => {
                const user = res.user;
                console.log(user)
                setLoading(false)
                navigate(locs, {replace: true})

            })
    }

    const handleValidateCaptcha = () => {
        const value = captchaRef.current.value;
        if (validateCaptcha(value) == true) {
            setDisable(false)
        }

        else {
            setDisable(true)
        }
    }
    return (
        <div>
            <Helmet>
                <title>BistroBoss || Register</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <LoadCanvasTemplate />
                                <input type="text" ref={captchaRef} placeholder="typeCaptcha" name="captcha" className="input input-bordered" onBlur={handleValidateCaptcha} required />
                                {/* <button className='btn btn-outline btn-xs' onClick={handleValidateCaptcha}>Validate</button> */}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" disabled={disable}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;