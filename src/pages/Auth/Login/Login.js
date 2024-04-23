import {React,useState,useContext} from 'react'
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../../config/firebase";
// import { Navigate } from 'react-router-dom';
import {AuthContext} from "../../../context/AuthContext";
// import Dashboard from "../../Dashboard/index"


export default function Login() {
  // const navigate = useNavigate();
  const {isAuthenticated} = useContext(AuthContext);
  // let {isAuthenticated}= staty;

  const initialState = {
    email: "",
    password: ""
  }
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const { email, password } = state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        isAuthenticated = true;
        console.log("Hi i'm authentication of ", isAuthenticated );
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      }).finally(()=>{
        
        setTimeout(() => {
          setIsProcessing(false);
          // navigate('/dashboard');
          // <Navigate to="/dashboard" />
        }, 1000);
      });
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