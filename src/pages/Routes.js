
import { React, useContext} from 'react';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import { AuthContext } from '../context/AuthContext';
import PrivateRoutes from '../Components/PrivateRoutes';

export default function Index() {
  console.log(useContext(AuthContext));


    const { isAuthenticated } = useContext(AuthContext);
    // const { isAuthenticated } = staty;
    // console.log(staty);
    console.log(isAuthenticated);


  return (
    <BrowserRouter>

      <Routes>
        <Route path='/*' element={<Frontend />} />
        <Route path='/auth/*' element={!isAuthenticated ? <Auth /> : <Navigate to='/dashboard' />} />
        <Route path='/dashboard/' element={ <PrivateRoutes Component={Dashboard} />} />
      </Routes>
    </BrowserRouter>
  )
}
