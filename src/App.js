import "bootstrap/dist/js/bootstrap.bundle";
import './App.scss';
import Routes from "./pages/Routes";
import AuthContextProvider from "./context/AuthContext";
import{ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
      <ToastContainer />
    </>
  );
}

export default App;
