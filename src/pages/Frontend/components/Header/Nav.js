import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from '../../../../context/AuthContext'
import { signOut } from 'firebase/auth';
import {auth} from "../../../../config/firebase"


export default function Nav() {
    const { isAuthenticated, dispatch } = useContext(AuthContext);
    // const { isAuthenticated } = staty;
    console.log(isAuthenticated);

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch({ type: "LOGOUT" });
        }).catch((error) => {
            // An error happened.
            alert("Could not signOut");
        });
        
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/contact'>Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/todo'>Todo</Link>
                            </li>

                        </ul>
                        <div className="ms-auto">
                            {isAuthenticated ?
                                <>
                                    <Link to="/dashboard" className='btn btn-secondary'>Dashboard</Link>
                                    <button className="btn btn-sm btn-danger" onClick={handleLogout}>Logout</button>
                                </>
                                :
                                <Link to='/auth/register' className='btn btn-sm btn-info'>SignIn</Link>
                            }
                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}
