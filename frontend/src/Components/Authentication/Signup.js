import React from 'react';
import './Signup.css';
import NewUserImage from '../../Images/NewUserImage.png';
import Tilt from 'react-tilt';
import longArrowLeftIcon from '../../Images/long-arrow-left.svg';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: '',
            registerPhone: '',
            registerSuccess: ''
        }
    }

    onRegisterEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value })
        this.setState({ registerSuccess: '' })
    }

    onRegisterPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value })
        this.setState({ registerSuccess: '' })
    }

    onRegisterNameChange = (event) => {
        this.setState({ registerName: event.target.value })
        this.setState({ registerSuccess: '' })
    }

    onRegisterPhoneChange = (event) => {
        this.setState({ registerPhone: event.target.value })
        this.setState({ registerSuccess: '' })
    }

    onRegisterSubmit = () => {
        const { registerEmail, registerPassword, registerName, registerPhone } = this.state;
        if (registerEmail.length === 0 || registerPassword.length === 0 || registerName.length === 0 || registerPhone.length === 0) {
            this.setState({ registerSuccess: 'All fields are necessary. Please enter your details' });
        }
        else {

            fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/register`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: registerEmail,
                    password: registerPassword,
                    name: registerName,
                    phone: registerPhone
                }),
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    if (typeof data === 'object') {
                        this.props.loadUser(data);
                        this.props.onRouteChange('home');
                    }
                    else if (typeof data === 'string') {
                        let requirements = '';
                        const reqArray = data.split(/\r?\n/);
                        reqArray.forEach(req => {
                            if (req.includes('Password'))
                                requirements += req + '. ';
                            else if (req.includes('Email'))
                                requirements += 'Invalid Email. ';
                            else if (req.includes('Mobile'))
                                requirements += 'Invalid Phone.';
                        })
                        this.setState({ registerSuccess: requirements })
                    }
                    else
                        console.log('Error signing up');
                })
        }
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className='signup'>
                <Tilt className="Tilt" options={{ max: 50, perspective: 700 }} >
                    <img src={NewUserImage} alt='New User Icon' id='signup-newuserimage' />
                </Tilt>
                <div className='signup-form-column'>
                    <h2 className='signup-h2'>Member Register</h2>
                    {<p className='register-status'> {this.state.registerSuccess} </p>}
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
                    <div className='signup-create-account'>
                    <img src={longArrowLeftIcon} alt='Left Arrow Icon' id='signup-arrow-icon' />
                    <p onClick={() => onRouteChange('signin')}>Sign into your account</p>
                </div>
                </div>
            </div>
        );
    }
}

export default Signup;