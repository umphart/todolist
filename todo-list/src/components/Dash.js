import React, { useState } from 'react';
import EditTask from '../modals/EditTask';
import { Alert, Button } from 'reactstrap';

const Dash = ({ taskObj, index, deleteTask, updateList }) => {
  const [modal, setModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State for showing confirmation alert

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC"
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1"
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1"
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1"
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD"
    }
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateList(obj, index);
  };

  // Show alert when the delete button is clicked
  const handleDeleteClick = () => {
    setShowAlert(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    deleteTask(index);
    setShowAlert(false); // Hide alert after deletion
  };

  // Cancel delete action
  const cancelDelete = () => {
    setShowAlert(false); // Hide alert without deleting
  };

  return (
    <div class="card-wrapper mr-5">
      <div class="card-top" style={{ backgroundColor: colors[index % 5].primaryColor }}></div>
      <div class="task-holder">
        <span class="card-header" style={{ backgroundColor: colors[index % 5].secondaryColor, borderRadius: "10px" }}>
          {taskObj.Name}
        </span>

        <p className='mt-5'>{taskObj.Description}</p>

        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          {/* Increase margin between edit and delete icon */}
          <i class="far fa-edit mr-4" style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }} onClick={() => setModal(true)}></i>
          <i class="fas fa-trash-alt" style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }} onClick={handleDeleteClick}></i>
        </div>
      </div>

      {/* EditTask modal */}
      <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />

      {/* Delete confirmation alert */}
      {showAlert && (
        <Alert color="danger" style={{ width: '250px', height: '200px', padding: '10px' }}>
          <h4 className="alert-heading">Confirm Deletion</h4>
          <p>Are you sure you want to delete this task? This action cannot be undone.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button color="danger" onClick={confirmDelete} className="me-2">
              Yes, Delete
            </Button>
            <Button color="secondary" onClick={cancelDelete}>
              Cancel
            </Button>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default Dash;
