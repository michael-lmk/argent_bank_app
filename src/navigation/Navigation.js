import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { HomeScreen } from "../screen/HomeScreen";
import LoginScreen from "../screen/LoginScreen"
import { ProfileScreen } from "../screen/ProfileScreen";
import { useDispatch } from "react-redux";
import { checkCredentialSuccess } from "../redux/reducers/UserReducer";


const Navigation = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith('jwt='))
            ?.split('=')[1];

        if (cookieValue) {
            dispatch(checkCredentialSuccess(cookieValue));
        }
    }, [])


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