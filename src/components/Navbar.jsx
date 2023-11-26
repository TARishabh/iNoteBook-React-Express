import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../context/notes/user/userContext';

export default function Navbar() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const logoutOnclick = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark bg-dark sticky-top`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">
                    Navbar
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link`} to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link`} to="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? (
                        <form className="d-flex" role="search">
                            <Link className="btn btn-outline-info mx-2" to="/login" role="button">
                                Login
                            </Link>
                            <Link className="btn btn-outline-info mx-2" to="/register" role="button">
                                Register
                            </Link>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                    ) : (
                        <form className="d-flex" role="search">
                            <button className="btn btn-outline-info mx-2" onClick={logoutOnclick} role="button">
                                Logout
                            </button>
                            <Link className="btn btn-outline-info mx-2" to="/userdetails" role="button">
                                {user.name}
                            </Link>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
}
