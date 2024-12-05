import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons'; 
import React, { useEffect, useState } from 'react'; 
import CreateTask from '../modals/CreateTask'; 
import Dash from './Dash'; 
import Login from './Login'; 
import Register from './Register'; 
import LogoutModal from './LogoutModal'; 
import { useNavigate } from 'react-router-dom'; 

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [userProfile, setUserProfile] = useState({ name: '', email: '' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [logoutModal, setLogoutModal] = useState(false);

    useEffect(() => {
        const profile = localStorage.getItem("userProfile");
        if (profile) {
            setUserProfile(JSON.parse(profile));
        }
    }, []);

    const toggleTaskModal = () => setModal(!modal);
    const toggleProfileModal = () => setProfileModal(!profileModal);
    const toggleLogoutModal = () => setLogoutModal(!logoutModal);

    const deleteTask = (index) => {
        const list = [...taskList];
        list.splice(index, 1);
        updateUserTasks(list);
    };

    const updateList = (obj, index) => {
        const list = [...taskList];
        list[index] = obj;
        updateUserTasks(list);
    };

    const saveTask = (taskObj) => {
        const list = [...taskList, taskObj];
        updateUserTasks(list);
        setModal(false);
    };

    const updateUserTasks = (list) => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = existingUsers.find(user => user.username === username);

        if (currentUser) {
            currentUser.tasks = list; 
            localStorage.setItem('users', JSON.stringify(existingUsers));
            setTaskList(list);
        }
    };

    const saveUserProfile = (profile) => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = existingUsers.find(user => user.username === username);
        if (currentUser) {
            currentUser.name = profile.name; 
            localStorage.setItem('users', JSON.stringify(existingUsers));
            setUserProfile(profile);
            setProfileModal(false); 
        }
    };

    const handleLogin = (status, user, tasks) => {
        setIsLoggedIn(status);
        setUsername(user);
        setTaskList(tasks || []); 
    };

    const switchToRegister = () => setShowRegister(true);
    const switchToLogin = () => setShowRegister(false);

    const confirmLogout = () => {
        setIsLoggedIn(false);
        setUsername('');                
        localStorage.removeItem('taskList');
        setLogoutModal(false);
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    <div className='header text-center mb-4'>
                        <div className='profile-section d-flex align-items-center justify-content-center mb-3'>
                            <FontAwesomeIcon icon={faUserCircle} size='2x' className='me-2' />
                            <div>
                                <h5 className='m-0'>{userProfile.name}</h5>
                                <small>{userProfile.email}</small>
                            </div>
                        </div>
                        <h3 className='mt-3'>Welcome, {username}!</h3>
                        <div className='button-group'>
                            <button className='btn btn-primary me-3' onClick={toggleTaskModal}>
                                <FontAwesomeIcon icon={faUser} className="me-1" /> Create Task
                            </button>
                            <button className='btn btn-danger' onClick={toggleLogoutModal}>
                                <FontAwesomeIcon icon={faUser} className="me-1" /> Logout
                            </button>
                        </div>
                    </div>
                    <div className='task-container'>
                        {taskList.map((obj, index) => (
                            <Dash
                                key={index}
                                taskObj={obj}
                                index={index}
                                deleteTask={deleteTask}
                                updateList={updateList}
                            />
                        ))}
                    </div>
                    <CreateTask toggle={toggleTaskModal} modal={modal} save={saveTask} />
                    <LogoutModal
                        isOpen={logoutModal}
                        toggle={toggleLogoutModal}
                        onConfirm={confirmLogout}
                    />
                </>
            ) : showRegister ? (
                <Register onRegister={switchToLogin} />
            ) : (
                <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
            )}
        </>
    );
};

export default TodoList;
