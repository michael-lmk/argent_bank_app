import React, { useEffect, useState } from 'react';
import { AppContainer } from '../appContainer/AppContainer';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUserInfo, getErrorMessage, updateUserInfo, getSuccessMessage, removeState } from "../redux/reducers/UserReducer";
import {API_URL} from '../constants/Config'
axios.defaults.baseURL = `${API_URL}/api/v1/user`;

export const ProfileScreen = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { jwt, user, error, success } = useSelector(state => state.user);
    const [showFormModify, setShowFormModify] = useState(false);

    /**
     * Function for get user information And put this in redux store
     */
    const getUserInfo = async () => {
        try {

            var instance = axios.create({
                headers: { 'Authorization': `Bearer ${jwt}` }
            });

            const { data } = await instance.post('/profile');

            if (data.status === 200) {
                dispatch(setUserInfo(data.body));
            }

        } catch (error) {
            handleError();
        }
    }

    const handleError = () => {
        dispatch(getErrorMessage("Session expirer !"));
        dispatch(removeState());
    }

    /**
     * Submit form for updating user profil
     */
    const submitUpdateUser = async () => {
        try {

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
            }

            const { data } = await axios.put('/profile',
                {
                    lastName: user.lastName,
                    firstName: user.firstName
                },
                config
            );

            if (data.status === 200) {
                dispatch(getSuccessMessage(data.message));
            }

        } catch (error) {
            dispatch(getErrorMessage(error.message));
        }
    }

    /**
     * Check is set and redirect if not set 
     */
    useEffect(() => {
        if (jwt) {
            dispatch(getErrorMessage(""));
            dispatch(getSuccessMessage(""));
            getUserInfo();
        } else {
            navigate('/');
        }

    }, [jwt])

    /**
     * Display error message after 5 second 
     */
    useEffect(() => {
        setTimeout(() => {
            dispatch(getErrorMessage(""));
            dispatch(getSuccessMessage(""));
        }, 5000);
    }, [error, success])


    return (
        <AppContainer>
            <div className="header">
                <h1>Welcome back<br />Tony Jarvis!</h1>
                <button className="edit-button" onClick={() => setShowFormModify(state => !state)}>Edit Name</button>
                {error && <p className='alert alert-danger'>{error}</p>}
                {success && <p className='alert alert-success'>{success}</p>}
                {showFormModify &&
                    <div>
                        <div className='edit-user-info'>
                            <div className="input-wrapper">
                                <input placeholder='firstname' type="text" id="firstname" value={user.firstName ? user.firstName : ""} onChange={(event) => { dispatch(updateUserInfo({ firstName: event.target.value })) }} />
                            </div>
                            <div className="input-wrapper">
                                <input placeholder='lastname' type="text" id="lastname" value={user.lastName ? user.lastName : ""} onChange={(event) => { dispatch(updateUserInfo({ lastName: event.target.value })) }} />
                            </div>

                        </div>
                        <button className="edit-button save-btn" onClick={() => submitUpdateUser()}>Save</button>
                        <button className="edit-button cancel-btn" onClick={() => setShowFormModify(state => !state)}>Cancel</button>
                    </div>
                }
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </AppContainer>
    )
}
