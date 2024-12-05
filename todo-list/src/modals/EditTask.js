import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const EditTask = ({ modal, toggle, updateTask, taskObj }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescp] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "taskName") {
            setTaskName(value);
        } else {
            setDescp(value);
        }
    };
    useEffect(() => {
        setTaskName(taskObj.Name);
        setDescp(taskObj.Description);
    }, [taskObj]); // Add taskObj as a dependency
    const handleUpdate = (e) => {
        e.preventDefault();
        let temObj = {};
        temObj['Name'] = taskName;
        temObj['Description'] = description;

        updateTask(temObj);
        
        // Dismiss the modal after updating the task
        toggle();
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
            <ModalBody>
                <form>
                    <div className='form-group'>
                        Name
                        <input
                            type='text'
                            className='form-control'
                            value={taskName}
                            name='taskName'
                            onChange={handleChange}
                        />
                    </div>
                    <p></p>
                    Description
                    <div className='form-group'>
                        <textarea
                            className='form-control'
                            rows="5"
                            value={description}
                            name='description'
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdate}>
                    Update
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTask;
