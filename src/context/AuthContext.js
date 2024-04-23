import { React, createContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "../config/firebase";


const initialState = { isAuthenticated: false };
export const AuthContext = createContext();

const reducer = ((state, action) => {

    switch (action.type) {
        case "LOGIN":
            return { isAuthenticated: true ,  user : action.payload.user};


        case "LOGOUT":
            return { isAuthenticated: false };

            // default :
            // return state;

    }
});

 


export default function AuthContextProvider(props) {
    let [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                dispatch({ type: "LOGIN", payload : {user} });
                console.log(uid);
                // ...
            } else {
                // User is signed out
                // dispatch({type : "LOGOUT"});
                // ...
            }
        });
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}
