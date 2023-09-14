import React from "react";
import { Link } from "react-router-dom";

const NavBar:React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container fs-5">
          <Link to={"/"} className="navbar-brand">
            USER MANAGEMENT SYSTEM
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link to={"/create-user"} className="nav-link text-white">
                  Register-User
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/users"} className="nav-link text-white">
                  View-Users
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <span className='footer'>
        <p>@All Rights Reserved By CodeBySwamy..!</p>
      </span>
    </div>
  );
};

export default NavBar;
