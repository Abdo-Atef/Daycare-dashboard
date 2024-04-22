import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.png"
export default function NavBarWebsite() {
    return (
    <nav className="navbar navbar-expand-lg bg-white shadow p-0 m-0 position-fixed fixed-top">
        <div className="container">
            <Link className="navbar-brand p-0 m-0" to="/" ><img src={logo} style={{width:100}} alt="logo" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 p-0 m-0">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link" to="/contact">Contact</Link>
                </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 p-0 m-0">
                <li className="nav-item">
                    <Link className='btn btn-outline-dark px-5' to={'/parent.login'}>Login</Link>
                </li>
                <li className="nav-item ms-2">
                    <Link className='btn btn-warning  px-4' to={'/Registration'}>Apply Now</Link>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    )
}
