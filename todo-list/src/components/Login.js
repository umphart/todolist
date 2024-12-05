// src/components/Login.js
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';

const Login = ({ onLogin, onSwitchToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');

    const handleLogin = () => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = existingUsers.find(user => user.username === username && user.password === password);
        
        if (user) {
            setAlertMessage('Login successful!');
            setAlertColor('success');
            setAlertVisible(true);
            onLogin(true, user.username, user.tasks);

            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
        } else {
            setAlertMessage('Invalid credentials!');
            setAlertColor('danger');
            setAlertVisible(true);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Form className="border p-4 rounded shadow" style={{ width: '300px' }}>
                <h2 className="text-center mb-4">Login</h2>
                {alertVisible && <Alert color={alertColor}>{alertMessage}</Alert>}
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input 
                        type="text" 
                        id="username" 
                        placeholder="Enter your username" 
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
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required // Added required attribute
                    />
                </FormGroup>
                <Button color="primary" onClick={handleLogin} className="w-100">Login</Button>
                <Button color="link" onClick={onSwitchToRegister} className="w-100 mt-2">Register</Button>
            </Form>
        </Container>
    );
};

export default Login;
