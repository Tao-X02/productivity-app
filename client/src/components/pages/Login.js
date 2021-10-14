// Import dependencies
import React, { Component } from "react";
import Button from 'react-bootstrap/button';
import { Col } from 'react-bootstrap';

export default class SignUp extends Component {
    render() {
        return (
            <div className="outer">
                <form className="inner">
                    <h3>Log In</h3>

                    <div className="form-group">
                        <label className="custom-control-label">Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label className="custom-control-label">Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <Button as={Col} variant="success" size='xs' xs={{ span: 12 }} className="form-button">Log In</Button>
                    <p className="forgot-password text-right">
                        Forgot your password? <a href="/login">Click here</a>
                    </p>
                </form>
            </div>
        );
    }
}