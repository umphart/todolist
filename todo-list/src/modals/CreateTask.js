import React, { useState } from 'react';
import { Button,Modal, ModalHeader, ModalBody,ModalFooter, Alert} from "reactstrap";
const CreateTask = ({modal, toggle, save}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescp] = useState('');
    const [visible, setVisible] = useState(false); 
  const onDismiss = () => setVisible(false);
    const handleChange = (e)=>{
        const {name, value} = e.target
         e.preventDefault();
        if (name === "taskName"){
            setTaskName(value)
        }else{
            setDescp(value)
        }  
    }
    const handleSave = (e) => {
         e.preventDefault(); 
        if (taskName !== "" && description !== "") {
          let taskObj = {
            Name: taskName,
            Description: description
          };
          save(taskObj); 
          setTaskName("");
          setDescp("");
        } else {
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
          }, 3000); 
        }
      };
    return (
     <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Task</ModalHeader>
        <ModalBody>
         <form>
            <div className='form-group'>
                Name
            <input type='text' className='form-control' value={taskName} name='taskName' onChange={handleChange}></input>
            </div>
                <p></p>
                Description
            <div className='form-group'>
                <textarea className='form-control' rows="5" value={description} required name='description' onChange={handleChange}>
                </textarea>
            </div>
         </form>
         <Alert color="danger" isOpen={visible} toggle={onDismiss}>
        Both Task Name and Description are required!
      </Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            CreateTask
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>

    </ModalFooter>
    </Modal>
 
    );
};
export default CreateTask;