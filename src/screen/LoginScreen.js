import React, { useState, useEffect } from 'react';
import { AppContainer } from '../appContainer/AppContainer';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getErrorMessage, checkCredentialSuccess } from '../redux/reducers/UserReducer';
import {API_URL} from '../constants/Config'
axios.defaults.baseURL = 'http://localhost:3001/api/v1/user';

const LoginScreen = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const { jwt, error } = useSelector((state) => state.user)

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            }

            const { data } = await axios.post(
                '/login',
                { email, password },
                config
            )
            
            if (data.status === 200) {
                if (rememberMe) {
                    document.cookie = `jwt=${data.body.token}; SameSite=${API_URL}; max-age=31536000 `;
                }
                dispatch(checkCredentialSuccess(data.body.token))
            }

        } catch (error) {
            dispatch(getErrorMessage("Identifiants incorrect !"))
        }

    }

    useEffect(() => {
        if (jwt) {
            navigate('/profile')
        }
    }, [jwt, navigate])

    return (
        <AppContainer>

            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                {error && <p className='alert alert-danger'>{error}</p>}

                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={(event) => { setEmail(event.target.value) }} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" onChange={(event) => { setRememberMe(() => event.target.checked); }} value="remembered" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>

                    <button onClick={submitHandler} className="sign-in-button">Sign In</button>

                </form>
            </section>

        </AppContainer>
    )
}

export default LoginScreen
