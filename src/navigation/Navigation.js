import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { HomeScreen } from "../screen/HomeScreen";
import LoginScreen from "../screen/LoginScreen"
import { ProfileScreen } from "../screen/ProfileScreen";
import axios from 'axios';
import { useSelector } from "react-redux";



const Navigation = () => {
    const { jwt } = useSelector(state => state.user);
    axios.defaults.baseURL = 'http://localhost:3001/api/v1/user';
    // axios.defaults.headers.common = {'Authorization': `bearer ${jwt}`}

    return (
        <>
            <Router>

                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                </Routes>

            </Router>
        </>
    )
}
 
export default Navigation