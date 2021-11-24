import React from 'react';
import './Signin.css';
import NewUserImage from '../../Images/NewUserImage.png';
import Tilt from 'react-tilt';
import longArrowIcon from '../../Images/long-arrow-alt-right-solid.svg';

class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginEmail: '',
            loginPassword: ''
        }
    }

    onLoginEmailChange = (event) => {
        this.setState({ loginEmail: event.target.value })
    }

    onLoginPasswordChange = (event) => {
        this.setState({ loginPassword: event.target.value })
    }

    onLoginSubmit = () => {
        const { loginEmail, loginPassword } = this.state;
        if (loginEmail.length === 0 || loginPassword.length === 0) {
            console.log('All fields are necessary. Please enter your details');
        }
        else {
            fetch('http://localhost:3001/signin', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (typeof data === 'object') {
                        console.log('Login success');
                        this.props.loadUser(data);
                        this.props.onRouteChange('home');
                    }
                    else if (typeof data === 'string') {
                        console.log("Login fail");
                    }
                    else
                        console.log('Error signing in');
                })
                .catch( () => {
                    console.log('signin: error communicating with the server');
                })
        }
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className='signin'>
                <Tilt className="Tilt" options={{ max: 50, perspective: 700 }} >
                    <img src={NewUserImage} alt='New User Icon' id='signin-newuserimage' />
                </Tilt>
                <div className='signin-form'>
                    <h2 className='signin-h2'>Member Login</h2>
                    <input type='email' name='loginEmail' placeholder='Email' onChange={this.onLoginEmailChange} />
                    <input type='password' name='loginPassword' placeholder='Password' onChange={this.onLoginPasswordChange} />
                    <button type='submit' name='loginSubmit' value='login' onClick={this.onLoginSubmit}>LOGIN</button>
                    <p className='signin-p' id='forgot-password'>Forgot Username / Password?</p>
                </div>
                <div className='signin-create-account'>
                    <p onClick={() => onRouteChange('signup')}>Create your account</p>
                    <img src={longArrowIcon} alt='Arrow Icon' id='signin-arrow-icon' />
                </div>
            </div>
        );
    }
}

export default Signin;