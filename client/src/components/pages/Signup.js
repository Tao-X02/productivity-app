// Import dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/button';
import { Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function Signup() {
    let history = useHistory();

    // Intialize state variables
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: ""
    });

    // Handle submit
    const handleClick = () => {
        if (user.firstName && user.lastName && user.password && user.email) {
            axios.post("http://localhost:5000/api/v1/users/", user)
            .then(res=>console.log(res))
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
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label className="custom-control-label">First name</label>
                    <input type="text" className="form-control" placeholder="First name" name="firstName" value={user.firstName} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label className="custom-control-label">Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" name="lastName" value={user.lastName} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label className="custom-control-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" value={user.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label className="custom-control-label">Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" value={user.password} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label className="custom-control-label">Confirm password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <Button 
                    as={Col} 
                    variant="success" 
                    size='xs' 
                    xs={{ span: 12 }} 
                    className="form-button"
                    onClick={!isLoading ? handleClick: null}
                >
                    Sign Up
                </Button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">log in?</a>
                </p>
            </form>
        </div>
    );
}

export default Signup;