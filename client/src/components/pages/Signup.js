import React, { Component } from "react";
import Button from 'react-bootstrap/button';
import { Col } from 'react-bootstrap';

export default class SignUp extends Component {
    render() {
        return (
            <div className="outer">
                <form className="inner">
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label className="custom-control-label">First name</label>
                        <input type="text" className="form-control" placeholder="First name" />
                    </div>

                    <div className="form-group">
                        <label className="custom-control-label">Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>

                    <div className="form-group">
                        <label className="custom-control-label">Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label className="custom-control-label">Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <label className="custom-control-label">Confirm password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <Button as={Col} variant="success" size='xs' xs={{ span: 12 }} className="form-button">Sign Up</Button>
                    <p className="forgot-password text-right">
                        Already registered <a href="/login">log in?</a>
                    </p>
                </form>
            </div>
        );
    }
}