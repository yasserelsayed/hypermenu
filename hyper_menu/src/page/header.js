import React from 'react'
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie'

function Header() {
  const [cookies] = useCookies(['access_token'])
  let userAuthed = false ;  
  if(cookies.access_token) userAuthed = true;
  return (
 <header>
  <nav class="navbar  navbar-fixed-top navbar-default">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle uarr collapsed" data-toggle="collapse" data-target="#navbar-collapse-uarr">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/" title="">
          <img width="200px" src="./assets/images/icon.svg" class="navbar-logo-img" alt="" />
        </a>
      </div>
      <div class="collapse navbar-collapse" id="navbar-collapse-uarr">
        <ul class="nav navbar-nav navbar-right">
          <li> <Link to="/">Home</Link></li>
          <li> <Link to="/contact">Contact</Link></li>
          <li> <Link to="/about">About</Link></li>
          <li  style={{display:userAuthed?"none":""}}> <Link to="/login">Login</Link></li>
          <li  style={{display:userAuthed?"none":""}} > <Link to="/register">Sign up</Link></li>
          <li  style={{display:userAuthed?"":"none"}}> <Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
    </div>
  </nav>
</header>
  );
}

export default Header;
