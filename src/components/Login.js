import React, { useEffect } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import "firebase/app";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const { googleSignIn, user } = UserAuth();

    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user != null) {
            navigate("/chats");
        }
    }, [user])

    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to Dochat</h2>
                <div
                    className="login-button google"
                    onClick={handleGoogleLogin}
                >
                    <GoogleOutlined /> Sign In with Google
                </div>
            </div>
        </div>
    )
}

export default Login;