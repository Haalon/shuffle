import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import "./Login.css";

export default function Login() {
    const { loginUser } = useContext(AuthContext);
    const [response, setResponse] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        const response = await loginUser(username, password);
        console.log(response)
        setResponse(response);

        return false;
    };

    return (
        <div className="w100 h100">
            <form onSubmit={handleSubmit} className="flex-column">
                <h3 className="">Login </h3>

                <label htmlFor="username">Username</label>
                <input className="w100" type="text" id="username" placeholder="Username" />
                <span style={{ color: "red"}} >{response["username"]}</span>

                <label htmlFor="password">Password</label>
                <input className="w100" type="password" id="password" placeholder="Password" />
                <span style={{ color: "red"}} >{response["password"] || response["detail"]}</span>

                {/* <div className="flex-fill"></div> */}
                <button className="w100" type="submit">Login</button>
                
            </form>
        </div>
    );
};

