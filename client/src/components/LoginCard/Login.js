import React from "react";
import './Login.css';

const Login = () => {
    return (
        <div className="full_page_container">
            <div className="auth-form-container">
                <h2>Login</h2><br /><br />
                <form className="login-form">
                    <label htmlFor="email">Email</label><br />
                    <input type="email" placeholder="youremail@gmail.com" id="email" name="email" /><br /><br />
                    <label htmlFor="password">Password</label><br />
                    <input type="password" placeholder="********" id="password" name="password" />
                    <br /><br /><br />
                    <button type="submit" id="login">Log In</button>
                </form>
                <br /><br />
                <span>Don't have an account? Register here.</span>
            </div>
        </div>
    )
}

export default Login