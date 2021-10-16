// Import dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/button';
import { Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function Login() {
    let history = useHistory();

    // Intialize state variables
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    // Handle submit
    const handleClick = () => {
        history.push("/Main");
        if (user.password && user.email) {
            history.push("/Main");
        }
    }

    // Handle inputs
    const handleChange = (e) => {
        setUser ({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="outer">
            <form className="inner">
                <h3>Log In</h3>

                <div className="form-group">
                    <label className="custom-control-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" value={user.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label className="custom-control-label">Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" value={user.password} onChange={handleChange} />
                </div>

                <Button as={Col} variant="success" size='xs' xs={{ span: 12 }} className="form-button" onClick={!isLoading ? handleClick: null} >Log In</Button>
                <p className="forgot-password text-right">
                    Forgot your password? <a href="/login">Click here</a>
                </p>
            </form>
        </div>
    );
}

export default Login;