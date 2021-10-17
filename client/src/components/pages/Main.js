// Import dependencies
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LogoutUser } from "../../actions/authActions";
import { useHistory, Link } from 'react-router-dom';
import { Container, NavDropdown, Nav, Navbar, Table, Button, Modal } from 'react-bootstrap';
import axios from "axios";

function Main(props) {
    const { user } = props.auth;
    const history = useHistory();

    // State variables
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    // Get tasks for user
    useEffect(() => {
        axios
            .get(`/api/v1/tasks/users/${user.id}`)
            .then((res) => {
                setTasks(res.data);
            })
            .catch(err => {
                console.error(err);
            });

        axios
            .get(`/api/v1/tasks/users/${user.id}/completed`)
            .then((res) => {
                setCompletedTasks(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    });

    // Display date
    const current = new Date();
    const currentDate = `${current.toLocaleString('default', { month: 'long' })} ${current.getDate()}, ${current.getFullYear()}`;

    const handleClick = (e) => {
        e.preventDefault();
        props.LogoutUser();
        history.push("");
    }

    const addTask = () => {
        alert("add task")
    }

    const deleteTask = (id) => {
        alert("delete task")
    }

    const editTask = () => {
        alert("edit task")
    }

    const getTasks = () => {
        return Object.values(tasks).map((task, index) => {
            // console.log(task);
            if (task.status.toUpperCase() !== "COMPLETED") {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.duration}</td>
                        <td>{task.status}</td>
                        <td>
                            <Button onClick={editTask} variant="success">Edit</Button>
                            <Button onClick={deleteTask} variant="danger">Delete</Button>
                        </td>
                    </tr>
                );
            }
        });
    }

    const getCompletedTasks = () => {
        return Object.values(completedTasks).map((task, index) => {
            // console.log(task);
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.duration}</td>
                    <td>{task.status}</td>
                    <td>
                        <Button onClick={() => {setShowAdd(true)}} variant="danger">Delete</Button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark" sticky="top" style={{ padding: '15px 0 15px 0', fontSize: '18px' }}>
            <Container>
                <Navbar.Brand href="#home" style={{ fontSize: '20px' }}>Productivity App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#Dashboard">Dashboard</Nav.Link>
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
            <div style={{ margin: '3vh 4vw 0 4vw'}}>
                <h2>Welcome, {user.firstName}!</h2>
                <h2>{currentDate}</h2>
                <h2>What do you want to do today?</h2>
                <Button onClick={handleShowAdd} variant="primary" size='xs' xs={{ span: 12, offset: 0 }}>New Task</Button>
                <Modal show={showAdd} onHide={handleCloseAdd} style={{ maginTop: '50px' }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Modal body text goes here.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={handleCloseAdd} variant="secondary">Close</Button>
                        <Button onClick={addTask} variant="primary">Add task</Button>
                    </Modal.Footer>
                </Modal>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTasks()}
                    </tbody>
                </Table>
                <h1>Completed tasks:</h1>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getCompletedTasks()}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

Main.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {LogoutUser}
)(Main);