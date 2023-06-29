import React from "react";
import {NavLink} from 'react-router-dom'
import { useAuth } from "../context/AuthContext";

const Header = () => {

  const [user,setUser] = useAuth()

  const handleLogout = () =>{
    window.confirm('Are you sure you want to log out')
    if(window.confirm){
      setUser(null)
      localStorage.removeItem('User')
    }
  }

  


  return (
    <>
      <nav className="navbar navbar-expand-lg text-uppercase fw-semibold fs-5 ">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand" >
            Expense Management 
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
               { user && user.name ? 
               (<>
               <li className="nav-item">
                <NavLink  className="nav-link active">{user.name}</NavLink>
              </li> 
               <li className="nav-item">
                <NavLink to="/login" onClick={handleLogout} className="nav-link active">Logout</NavLink>
              </li>
              </>) : 
               (<>
               <li className="nav-item">
                <NavLink to="/login"  className="nav-link active">Login</NavLink>
              </li>
               </>)} 
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
