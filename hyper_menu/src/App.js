import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React from 'react'
import {  HashRouter  ,  Routes, Route } from "react-router-dom";
import Home from './page/home' 
import Contact from './page/contact' 
import About from './page/about' 
import Login from './page/login' 
import Register from './page/register' 
import MenuStudio from './page/menu_studio' 
import Dashboard from './page/dashboard' 
import Preview from './page/preview' 
import axios from 'axios';

function App() {
  axios.defaults.baseURL = 'http://menuhyper.xyz/app/api/';
  return (
    <div className="App">
          <HashRouter>
             <Routes>
                 <Route path="/" element={<Home />} />
                 <Route path="contact" element={<Contact />} />
                 <Route path="about" element={<About />} />
                 <Route path="login" element={<Login />} />
                 <Route path="register" element={<Register />} />
                 <Route path="studio/:menuId/:menuName/:templateClass" element={<MenuStudio />} />
                 <Route path="dashboard" element={<Dashboard />} />
                 <Route path="preview/:menuId" element={<Preview />} />
            </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
