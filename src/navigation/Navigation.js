import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { HomeScreen } from "../screen/HomeScreen";
import LoginScreen from "../screen/LoginScreen"
import { ProfileScreen } from "../screen/ProfileScreen";

const Navigation = () => {

    return (
        <>
            <Router>

                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/user/:user_id" element={<ProfileScreen />} />
                </Routes>

            </Router>
        </>
    )
}
 
export default Navigation