import React from 'react';
import './Signup.css';
import NewUserImage from '../../Images/NewUserImage.png';
import Tilt from 'react-tilt';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: '',
            registerPhone: ''
        }
    }

    onRegisterEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value })
    }

    onRegisterPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value })
    }

    onRegisterNameChange = (event) => {
        this.setState({ registerName: event.target.value })
    }

    onRegisterPhoneChange = (event) => {
        this.setState({ registerPhone: event.target.value })
    }

    onRegisterSubmit = () => {
        const { registerEmail, registerPassword, registerName, registerPhone } = this.state;
        if (registerEmail.length === 0 || registerPassword.length === 0 || registerName.length === 0 || registerPhone.length === 0) {
            console.log('All fields are necessary. Please enter your details');
        }
        else {

            fetch('http://localhost:3001/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: registerEmail,
                    password: registerPassword,
                    name: registerName,
                    phone: registerPhone
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (typeof data === 'object') {
                        console.log('Register success');
                        this.props.loadUser(data);
                        this.props.onRouteChange('home');
                    }
                    else if (typeof data === 'string') {
                        console.log(data);
                        console.log("Register fail");
                    }
                    else
                        console.log('Error signing up')
                })
        }
    }

    render() {
        return (
            <div className='signup'>
                <Tilt className="Tilt" options={{ max: 50, perspective: 700 }} >
                    <img src={NewUserImage} alt='New User Icon' id='newuserimage' />
                </Tilt>
                <div className='signup-form-column'>
                    <h2>Member Register</h2>
                    <div className='signup-form-row'>
                        <input type='email' name='registerEmail' placeholder='Email' onChange={this.onRegisterEmailChange} />
                        <input type='password' name='registerPassword' placeholder='Password' onChange={this.onRegisterPasswordChange} />
                    </div>
                    <div className='signup-form-row'>
                        <input type='text' name='registerName' placeholder='Full Name' onChange={this.onRegisterNameChange} />
                        <input type='tel' name='registerMobile' placeholder='Mobile' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                            onChange={this.onRegisterPhoneChange} />
                    </div>
                    <button type='submit' name='registerSubmit' value='login' onClick={this.onRegisterSubmit}>REGISTER</button>
                </div>
            </div>
        );
    }
}

export default Signup;