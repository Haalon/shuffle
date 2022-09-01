import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [response, setResponse] = useState({});
    const { registerUser } = useContext(AuthContext);

    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== password2) return;
        const data = await registerUser(username, email, password);
        setResponse(data);
        return false;
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <hr />
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                        placeholder="example@mail.com"
                        required
                    />
                    <span style={{ color: "red" }}>{response["email"]}</span>
                </div>
                
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <span style={{ color: "red" }}>{response["username"]}</span>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <span style={{ color: "red" }}>{response["password"]}</span>
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        onChange={e => setPassword2(e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                    <p>{password2 !== password ? "Passwords do not match" : ""}</p>
                </div>
                <button disabled={password2 !== password}>Register</button>
            </form>
        </section>
    );
}
