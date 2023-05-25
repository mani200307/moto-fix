import React, { useContext, useEffect, useState } from 'react'
import { firebaseApp } from '../firebase';


const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

    const [curUser, setCurUser] = useState();
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => {
        return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
    }

    const login = (email, password) => {
        return firebaseApp.auth().signInWithEmailAndPassword(email, password);
    }

    const logout = () => {
        return firebaseApp.auth().signOut();
    }

    useEffect(() => {
        const unsubscribe = firebaseApp.auth().onAuthStateChanged(user => {
            setCurUser(user)
            setLoading(false)
        })
        return unsubscribe;
    }, [])

    const value = {
        curUser,
        login,
        signUp,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}