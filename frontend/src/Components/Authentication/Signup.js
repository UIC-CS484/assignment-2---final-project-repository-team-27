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
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.registerName,
                phone: this.state.registerPhone
            })
        })
            .then(response => response.json())
            .then(data => {
                if (typeof data === 'object') {
                    console.log('Register success');
                    console.log(data);
                    this.props.onRouteChange('home');
                }
                else if (typeof data === 'string')
                    console.log("Register fail")
                else
                    console.log('Error signing up')
            })
    }

    render() {
        return (
            <div className='signup'>
                <Tilt className="Tilt" options={{ max: 50, perspective: 700 }} >
                    <img src={NewUserImage} alt='New User Icon' id='newuserimage' />
                </Tilt>
                <div className='signup-form-1'>
                    <h2>Member Register</h2>
                    <input type='email' name='email' placeholder='Email' onChange={this.onRegisterEmailChange}/>
                    <input type='password' name='password' placeholder='Password' onChange={this.onRegisterPasswordChange} />
                    <button type='submit' name='submit' value='login' onClick={this.onRegisterSubmit}>REGISTER</button>
                </div>
                <div className='sign-up-form-2'>
                    <input type='text' name='name' placeholder='Full Name' onChange={this.onRegisterNameChange}/>
                    <input type='tel' name='mobile' placeholder='Mobile' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    onChange={this.onRegisterPhoneChange}/>
                </div>
            </div>
        );
    }
}

export default Signup;