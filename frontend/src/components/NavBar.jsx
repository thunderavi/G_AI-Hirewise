// src/components/NavBar.jsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleNavClick = (e) => {
        if (!user) {
            e.preventDefault();
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Hirewise</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/chat">Interview Prep</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/job-fit-checker">CV Analyzer</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/job-listing">Job Listings</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link">Welcome, {user.username}</span>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn" onClick={logout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <button className="nav-link btn" onClick={() => setIsModalOpen(true)}>Login/Register to access features</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default NavBar;
