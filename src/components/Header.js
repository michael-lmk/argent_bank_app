import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { removeState } from '../redux/reducers/UserReducer';

export const Header = () => {
    const { user } = useSelector(state => state.user);
    const { jwt } = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    /**
     * Function for disconnect user
     */
    const signOut = () => {
        dispatch(removeState());
    }

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
            <div className='row'>
                <div>
                    <NavLink className="main-nav-item" to="/login">
                        <i className="fa fa-user-circle"></i>
                        {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : "Sign In"
                        }
                    </NavLink>
                </div>
                {jwt.length > 0 &&
                    <button onClick={() => { signOut() }} className='sign-out'>
                        sign out
                    </button>
                }
            </div>

        </nav>
    )
}
