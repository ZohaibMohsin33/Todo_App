import React, { useState,useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireStore } from "../../../config/firebase";
import { collection, addDoc } from "firebase/firestore/lite";
import { useNavigate } from 'react-router-dom';

export default function Register() {

   const navigate = useNavigate();


    const initialState = {
        email: "",
        password: ""
    }
    const { dispatch } = useContext(AuthContext);
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        const { email, password } = state;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("yhn tk main chal rhaa hu")
                addDocument(user)
               
                
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage);
                // ..
            });
        console.log(state);
        setTimeout(() => {
            setIsProcessing(false);
        }, 1000);
    }
    const addDocument = async (user) => {
        console.log("main bhi chal rha hu")

        try {
            const docRef = await addDoc(collection(fireStore, "users"), {
                firstName: "",
                lastName: "",
                userid: user.uid
            });
            console.log("Document written with ID: ", docRef.id);
            dispatch({ type: "LOGIN" })
            navigate("/dashboard");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    

    return (
        <div className='container'>
            <form className='card p-3' style={{ width: 600 }} onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" name='email' className="form-control" onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" name='password' className="form-control" id="inputPassword" onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">

                        <button className='btn btn-success w-100' onClick={handleSubmit}>
                            {!isProcessing ?

                                "Submit" :
                                <div className="spinner spinner-border"></div>
                            }
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}
