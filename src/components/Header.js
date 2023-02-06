import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

export const Header = () => {
    const { user } = useSelector(state => state.user);

    return (
        <nav className="main-nav">
            <NavLink className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src="./img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div>
                <NavLink className="main-nav-item" to="/login">
                    <i className="fa fa-user-circle"></i>
                    {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    :"Sign In"
                    }
                </NavLink>
            </div>
        </nav>
    )
}
