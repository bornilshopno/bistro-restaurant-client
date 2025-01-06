import { createContext, useEffect, useState } from "react";
import app from "./firebase.config"
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(null);
    const axiosPublic = useAxiosPublic();
    //firebase lookup
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                //get token and store client 
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            //can be checked from client side=>inspect==>Application==>LocalStorage==>clientURL[when login/logout]
                        }
                    })
            }
            else {
                //TO DO : remove token(if token stored in the client side [localStorage, caching, inMemory])
                //for HTTP only== cookies need to remove from server side
                localStorage.removeItem('access-token')
            }
            console.log("CurrentUser from statechanged", currentUser)
            setLoading(false)
        })
        return (() => unSubscribe())  //in module it was return inside of an array funciton
    }, [auth,axiosPublic])


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name, photo) => {

        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        setLoading(true);
        return signOut(auth)
    }

    //google
    const provider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }


    const authInfo = { user, loading, setLoading, createUser, userLogin, logout, updateUserProfile, googleSignIn }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;