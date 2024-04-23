import React, { useContext } from 'react'
import {Routes , Route} from "react-router-dom"
import Home from "./Home"
import Contact from "./Contact";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Todo from "./Todo"
import { AuthContext } from '../../context/AuthContext';



export default function Index() {
  const {isAuthenticated } =  useContext(AuthContext);
  return (
    <>
    <Header />
    <main>
    <Routes>
        <Route path='/'>
            <Route index element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/todo' element={!isAuthenticated ? <Home /> : <Todo />} />
        </Route>
    </Routes>
    </main>
    <Footer />
    
    </>
  )
}
