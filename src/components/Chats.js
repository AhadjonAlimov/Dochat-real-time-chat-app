import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { ChatEngine } from 'react-chat-engine';
import { UserAuth } from "../contexts/AuthContext";
import axios from 'axios';


const Chats = () => {
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { user, logout } = UserAuth();


    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
    }

    useEffect(() => {
        if (user == null) {
            navigate("/");
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
                "user-name": user?.email,
                "user-secret": user?.uid,
            }
        })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formData = new FormData();
                formData.append('email', user?.email);
                formData.append('username', user?.email);
                formData.append('secret', user?.uid);

                // for (let [key, value] of formData.entries()) {  // checking formData "formData.entries()", "formData.keys()", "formData.values()"
                //     console.log(key, value);
                // }
                // for (const value of formData.values()) {
                //     console.log(value);
                // }

                getFile(user.photoURL)
                    .then((avatar) => {
                        formData.append('avatar', avatar, avatar.name);
                        axios.post('https://api.chatengine.io/users', formData, {
                            headers: {
                                "private-key": process.env.REACT_APP_CHAT_ENGINE_PROJECT_KEY,
                            }
                        })
                            .then(() => setLoading(false))
                            .catch((error) => console.log(error));
                    })
            })
    }, [user, navigate])

    if(!user || loading) return "Loading...";

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Dochat
                </div>
                <div className="logout-tab" onClick={handleLogout}>
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats;