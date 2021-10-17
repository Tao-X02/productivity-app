// Import dependencies
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LogoutUser } from "../../actions/authActions";
import { Link, useHistory } from 'react-router-dom';
import { Container, NavDropdown, Nav, Navbar } from 'react-bootstrap';

function Stats (props) {
    const { user } = props.auth;
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        props.LogoutUser();
        history.push("");
    }

    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark" sticky="top" style={{ padding: '15px 0 15px 0', fontSize: '18px' }}>
            <Container>
                <Navbar.Brand href="#home" style={{ fontSize: '20px' }}>Productivity App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/main">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/stats">Stats</Nav.Link>
                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleClick}>Log out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <h1>Statistics page</h1>
        </div>
    );
}

Stats.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {LogoutUser}
)(Stats);