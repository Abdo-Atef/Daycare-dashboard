import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from "../../assets/logo.png";

export default function NavBarWebsite() {
    return (
        <nav className="websiteNavBar navbar navbar-expand-lg bg-white   position-fixed fixed-top shadow">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} style={{ width: '150px',objectFit:"cover",height:60 }} alt="logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto  mb-lg-0 ">
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto  mb-lg-0 ">
                        <li className="nav-item">
                            <NavLink className='btn btn-outline-dark mb-2 me-2' to={'/parent.login'}>Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='btn bg-pink text-white' to={'/Registration'}>Apply Now</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
