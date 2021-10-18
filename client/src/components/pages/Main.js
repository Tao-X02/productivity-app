// Import dependencies
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LogoutUser } from "../../actions/authActions";
import { useHistory, Link } from 'react-router-dom';
import { Container, NavDropdown, Nav, Navbar, Table, Button, Modal } from 'react-bootstrap';
import axios from "axios";

// Import Activity modal
import Activity from './activityModal';

// React component
function Main(props) {
    // Get user
    const { user } = props.auth;
    
    const history = useHistory();

    // State variables
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showActivity, setShowActivity] = useState(false);
    const [editId, setEditId] = useState({});
    const [activity, setActivity] = useState({});
    const [newTask, setNewTask] = useState({
        userId: user.id,
        title: "",
        description: ""
    });
    const [editedTask, setEditedTask] = useState({
        title: editId.title,
        description: editId.description
    });

    // Functions to handle opening and closing the add modal
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    // Get uncompleted tasks for user
    useEffect(() => {
        axios
            .get(`/api/v1/tasks/users/${user.id}/uncomplated`)
            .then((res) => {
                setTasks(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    });

    // Display date
    const current = new Date();
    const currentDate = `${current.toLocaleString('default', { month: 'long' })} ${current.getDate()}, ${current.getFullYear()}`;

    // Handle user logout
    const handleClick = (e) => {
        e.preventDefault();
        props.LogoutUser();
        history.push("");
    }

    // Function to add task
    const addTask = () => {
        axios
            .post("/api/v1/tasks", newTask)
            .catch(err => {
                alert(err);
            });
        setShowAdd(false);
        setNewTask({
            userId: user.id,
            title: "",
            description: ""
        });
    }

    // Function to delete task
    const deleteTask = (id) => {
        axios
            .delete(`/api/v1/tasks/${id}`)
            .catch(err => {
                alert(err);
            });
    }

    // Function to edit task (*** Needs bug fix ***)
    const editTask = async (task) => {
        axios
            .patch(`/api/v1/tasks/${task._id}`, editedTask)
            .catch(err => {
                alert(err);
            });
        setShowEdit(false);
        setEditedTask({});
    }

    // Handle input changes
    const handleEditChange = (e) => {
        e.preventDefault();
        setEditedTask({
            ...editedTask,
            [e.target.name]: e.target.value
        })
    }

    const handleAddChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        })
    }

    // Conditional rendering for status button
    const statusButton = (task) => {
        if (task.status.toUpperCase() === "NOT STARTED") {
            return <Button onClick={() => {setShowActivity(true); setActivity(task)}} variant="warning">Start</Button>
        } else {
            return <Button variant="info">Resume</Button>
        }
    }
 
    // Display list of tasks for table
    const getTasks = () => {
        return Object.values(tasks).map((task, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.duration}</td>
                    <td>
                        {statusButton(task)}
                    </td>
                    <td>
                        <Button onClick={() => {
                                setEditId(task);
                                setShowEdit(true)
                            }}
                            variant="success"
                        >
                            Edit
                        </Button>
                        <Button onClick={() => deleteTask(task._id)} variant="danger">Delete</Button>
                    </td>
                </tr>
            );
        });
    }

    // Get completed tasks for table
    const getCompletedTasks = () => {
        axios
            .get(`/api/v1/tasks/users/${user.id}/completed`)
            .then((res) => {
                setCompletedTasks(res.data);
            })
            .catch(err => {
                console.error(err);
            });
        return Object.values(completedTasks).map((task, index) => {
            // console.log(task);
            if (task.status.toUpperCase() === "COMPLETED") {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                            {("0" + Math.floor((task.duration / 60000) % 60)).slice(-2)}:
                            {("0" + Math.floor((task.duration / 1000) % 60)).slice(-2)}.
                            {("0" + ((task.duration / 10) % 100)).slice(-2)}
                        </td>
                        <td>{task.status}</td>
                        <td>
                            <Button onClick={() => deleteTask(task._id)} variant="danger">Delete</Button>
                        </td>
                    </tr>
                );
            }
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
                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleClick}>Log out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <div style={{ margin: '3vh 4vw 5vh 4vw'}}>
                <h3>Welcome, {user.firstName}!</h3>
                <h3>{currentDate}</h3>
                <h3>What do you want to accomplish today?</h3>
                <Button onClick={handleShowAdd} variant="primary" size='xs' style={{ margin: '1vh 0 3vh 0' }}>Add a New Task</Button>

                <Modal show={showAdd} onHide={handleCloseAdd} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new task</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="form-group" style={{ margin: '0 1vh 4vh 1vh' }}>
                            <label className="custom-control-label">Name of task: </label>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                name="title"
                                value={newTask.title}
                                onChange={handleAddChange}
                            />
                        </div>
                        <div className="form-group" style={{ margin: '0 1vh 2vh 1vh' }}>
                            <label className="custom-control-label">Add a description: </label>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Description"
                                name="description"
                                value={newTask.description}
                                onChange={handleAddChange}
                            />
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={handleCloseAdd} variant="secondary">Close</Button>
                        <Button onClick={addTask} variant="primary">Add task</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit task - {editId.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="form-group" style={{ margin: '0 1vh 4vh 1vh' }}>
                            <label className="custom-control-label">Name: </label>
                            <input 
                                type="text"
                                className="form-control"
                                name="title"
                                value={editedTask.title}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className="form-group" style={{ margin: '0 1vh 2vh 1vh' }}>
                            <label className="custom-control-label">Description: </label>
                            <input 
                                type="text"
                                className="form-control"
                                name="description"
                                value={editedTask.description}
                                onChange={handleEditChange}
                            />
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => setShowEdit(false)} variant="secondary">Close</Button>
                        <Button onClick={() => editTask(editId)} variant="primary">Edit task</Button>
                    </Modal.Footer>
                </Modal>

                <Activity 
                    show={showActivity}
                    handleClose={() => {setShowActivity(false)}}
                    task={activity}
                />

                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Actions</th>
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
                            <th>Delete</th>
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

// Define prop types for component
Main.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

// Connect to redux
export default connect(
    mapStateToProps,
    {LogoutUser}
)(Main);