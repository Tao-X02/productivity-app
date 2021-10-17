// Import dependencies
import React, { Component } from "react";
import Button from 'react-bootstrap/button';
import { Col } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LoginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
    constructor() {
        super();

        // Initialize state variables
        this.state = {
            email: "",
            password: "",
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
        // Redirect to main page if logged in
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/main");
        }
        
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

        const userData = {
            email: this.state.email,
            password: this.state.password
        };
      
        this.props.LoginUser(userData);
    }

    render () {
        const { errors } = this.state;

        return (
            <div className="outer">
                <form className="inner">
                    <h3>Log In</h3>
    
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
                        <span className="text-danger">
                            {errors.email}
                            {errors.emailnotfound}
                        </span>
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
                        <span className="text-danger">
                            {errors.password}
                            {errors.passwordincorrect}
                        </span>
                    </div>
    
                    <Button as={Col} variant="success" size='xs' xs={{ span: 12 }} className="form-button" onClick={this.handleClick} >Log In</Button>
                    <p className="forgot-password text-right">
                        Forgot your password? <a href="/login">Click here</a>
                    </p>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    LoginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { LoginUser }
)(Login);