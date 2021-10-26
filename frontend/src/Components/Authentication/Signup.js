import React from 'react';
import './Signup.css';
import NewUserImage from '../../Images/NewUserImage.png';
import Tilt from 'react-tilt';

const Signup = ({ onRouteChange }) => {
    return (
        <div className='signup'>
            <Tilt className="Tilt" options={{ max: 50, perspective: 700 }} >
                <img src={NewUserImage} alt='New User Icon' id='newuserimage' />
            </Tilt>
            <div className='signup-form-1'>
                <h2>Member Register</h2>
                <input type='email' name='email' placeholder='Email' />
                <input type='password' name='password' placeholder='Password' />
                <button type='submit' name='submit' value='login' onClick={() => onRouteChange('home')}>REGISTER</button>
            </div>
            <div className='sign-up-form-2'>
                <input type='text' name='name' placeholder='Full Name' />
                <input type='password' name='mobile' placeholder='Mobile' />
            </div>
        </div>
    );
}

export default Signup;