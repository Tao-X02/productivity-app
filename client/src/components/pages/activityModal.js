// Import dependencies
import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";

/*
Props:
show
handleClose
task
*/

function Activity (props) {
    // State variables
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;
      
        if (isActive && isPaused === false) {
          interval = setInterval(() => {
            setTime((time) => time + 10);
          }, 10);
        } else {
          clearInterval(interval);
        }
        return () => {
          clearInterval(interval);
        };
    }, [isActive, isPaused]);

    // Start timer
    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };
      
    // Pause/resume timer
    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };
    
    // Reset timer
    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    // End timer
    const handleEnd = () => {
        setIsActive(false);
        //alert(`${time} ${props.task._id}`);
        axios
            .patch(`/api/v1/tasks/${props.task._id}`, {
                duration: time,
                status: "Completed"
            })
            .catch(err => {
                alert(err);
            });
        setTime(0);
    }

    return (
        <Modal show={props.show} onHide={props.handleClose} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Task in progress - {props.task.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="timer">
                    <div className='digits'>
                        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </div>
                    <div className='digits'>
                        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
                    </div>
                    <div className='digits mili-sec'>
                        {("0" + ((time / 10) % 100)).slice(-2)}
                    </div>
                </div>
                <p className='message'>Remember to take breaks!</p>
            </Modal.Body>

            <Modal.Footer>
                {!isActive && <Button variant="warning" onClick={handleStart} xs={{ offset: 0 }}>Start Timer</Button>}
                {isActive && <Button variant="primary" onClick={handlePauseResume}>{isPaused === true ? 'Resume' : 'Pause'}</Button>}
                <Button variant="success" onClick={handleReset}>Reset</Button>
                <Button variant="danger" onClick={handleEnd}>End</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Activity;