import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom"

const AuthContext = createContext();

const auth_root = 'http://localhost:8000/auth'

export default AuthContext;

// auth context component
export const AuthProvider = ({ children }) => {
    
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const response = await fetch(`${auth_root}/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            const us = jwtDecode(data.access)
            console.log(us);
            setUser(jwtDecode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            if (window.history.state && window.history.state.idx > 0) {
                // not sure why login creates 2 points in history
                navigate(-2);
            } else {
                // the current entry in the history stack will be replaced with the new one
                navigate('/', { replace: true }); 
            }
        } else {
            alert("Something went wrong!");
        }

        return data;
    };

    const registerUser = async (username, email, password) => {
        const response = await fetch(`${auth_root}/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password,
            })
        });
        const data = await response.json();
        if (response.status === 201) {
            navigate("/login");
        } else {
            alert("Something went wrong!");
        }

        return data;
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/");
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};