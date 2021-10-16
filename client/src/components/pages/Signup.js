// Import dependencies
import React, { Component } from "react";
import Button from 'react-bootstrap/button';
import { Col } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SignupUser } from "../../actions/authActions";
import classnames from "classnames";

class Signup extends Component {
    constructor() {
        super();

        // Initialize state variables
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    // Redirect to main page if logged in
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/main");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    // Functions
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleClick = (e) => {
        e.preventDefault();

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            password2: this.state.password2,
            email: this.state.email
        };
      
        this.props.SignupUser(newUser, this.props.history);
    }

    render () {
        const { errors } = this.state;

        return (
            <div className="outer">
                <form className="inner">
                    <h3>Sign Up</h3>
    
                    <div className="form-group">
                        <label className="custom-control-label">First name</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="First name"
                            name="firstName"
                            value={this.state.firstName}
                            error={errors.firstName}
                            onChange={this.handleChange}
                        />
                    </div>
    
                    <div className="form-group">
                        <label className="custom-control-label">Last name</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            name="lastName"
                            value={this.state.lastName}
                            error={errors.lastName}
                            onChange={this.handleChange}
                        />
                    </div>
    
                    <div className="form-group">
                        <label className="custom-control-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            name="email"
                            value={this.state.email}
                            error={errors.email}
                            onChange={this.handleChange}
                        />
                    </div>
    
                    <div className="form-group">
                        <label className="custom-control-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            name="password"
                            value={this.state.password}
                            error={errors.password}
                            onChange={this.handleChange}
                        />
                    </div>
    
                    <div className="form-group">
                        <label className="custom-control-label">Confirm password</label>
                        <input
                            type="password" 
                            className="form-control"
                            placeholder="Enter password"
                            name="password2"
                            value={this.state.password2}
                            error={errors.password2}
                            onChange={this.handleChange}
                        />
                    </div>
    
                    <Button 
                        as={Col} 
                        variant="success" 
                        size='xs' 
                        xs={{ span: 12 }} 
                        className="form-button"
                        onClick={this.handleClick}
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
}

Signup.propTypes = {
    SignupUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { SignupUser }
)(withRouter(Signup));