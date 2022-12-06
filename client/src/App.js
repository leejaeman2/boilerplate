import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage.jsx';
import LoginPage from './components/views/LoginPage/LoginPage.jsx';
import RegisterPage from './components/views/RegisterPage/RegisterPage.jsx';
//import Auth from './hoc/auth.js';
//import Footer from './components/views/Footer/Footer.jsx';

function App() {
  //const AuthLandingPage = Auth({LandingPage}, null, true);
  //const AuthLoginPage = Auth({LoginPage}, false);
  //const AuthRegisterPage = Auth({RegisterPage}, false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
