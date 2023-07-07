import React, { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleLogin = async (e) => {
        
        e.preventDefault();

        const {email, password} = user;
        const res = await fetch('http://localhost:5000/users/login', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();

        if (res.status === 400) {
            window.alert("Login failed");
            console.log(res.status);
            console.log(data);
        } else if (res.status !== 400) {
            window.alert("Login successful");
            navigate('/profile');
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("jwtoken", data.token);
            console.log(res.status);
            console.log(data);
        }
    };
    return (
        <div className="full_page_container">
            <div className="auth-form-container">
                <h2>Login</h2><br /><br />
                <form className="login-form">
                    <label htmlFor="email">Email</label><br />
                    <input type="email" placeholder="youremail@gmail.com" id="email" name="email" onChange={handleChange} /><br /><br />
                    <label htmlFor="password">Password</label><br />
                    <input type="password" placeholder="********" id="password" name="password" onChange={handleChange} />
                    <br /><br /><br />
                    <button type="submit" id="login" onClick={handleLogin}>Log In</button>
                </form>
                <br /><br />
                <span>For account details please contact your respective hostel office</span>
            </div>
        </div>
    )
}
export default Login