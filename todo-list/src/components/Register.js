// src/components/Register.js
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');

    // const validatePassword = (password) => {
    //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //     return passwordRegex.test(password);
    // };

    const handleRegister = () => {
        // Check if fields are empty
        if (!username || !password) {
            setAlertMessage('Please fill in all fields!');
            setAlertColor('danger');
            setAlertVisible(true);
            return;
        }

        // Validate password complexity
        // if (!validatePassword(password)) {
        //     setAlertMessage('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.');
        //     setAlertColor('danger');
        //     setAlertVisible(true);
        //     return;
        // }

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        if (existingUsers.some(user => user.username === username)) {
            setAlertMessage('Username already exists!');
            setAlertColor('danger');
            setAlertVisible(true);
            return;
        }

        const newUser = { username, password, tasks: [] };
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        setAlertMessage('Registration successful!');
        setAlertColor('success');
        setAlertVisible(true);
        onRegister();

        setTimeout(() => {
            setAlertVisible(false);
        }, 3000);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Form className="border p-4 rounded shadow" style={{ width: '300px' }}>
                <h2 className="text-center mb-4">Register</h2>
                {alertVisible && <Alert color={alertColor}>{alertMessage}</Alert>}
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input 
                        type="text" 
                        id="username" 
                        placeholder="Choose a username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required // Added required attribute
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input 
                        type="password" 
                        id="password" 
                        placeholder="Choose a password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required // Added required attribute
                    />
                </FormGroup>
                <Button color="primary" onClick={handleRegister} className="w-100">Register</Button>
                <Button color="link" onClick={onRegister} className="w-100 mt-2">Already have an account? Login</Button>
            </Form>
        </Container>
    );
};

export default Register;
