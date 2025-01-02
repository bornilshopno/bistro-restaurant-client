import { createContext, useEffect, useState } from "react";
import app from "./firebase.config"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";


export const AuthContext=createContext(null)
const AuthProvider = ({children}) => {
    const auth=getAuth(app)
    const[user,setUser]=useState([]);
    const[loading,setLoading]=useState(null);
    useEffect(()=>{
      const unSubscribe=  onAuthStateChanged(auth, currentUser=>{
        setUser(currentUser);
        console.log("CurrentUser from statechanged", currentUser)
        setLoading(false)
    })
      return (()=> unSubscribe())  //in module it was return inside of an array funciton
    },[auth])
    const createUser=(email,password)=>{
     setLoading(true);
     return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile=(name,photo)=>{

        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo,
        })
    }

    const userLogin=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logout=()=>{
        setLoading(true);
        return signOut(auth)
    }
    const authInfo={user,loading,setLoading, createUser,userLogin, logout,updateUserProfile}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;