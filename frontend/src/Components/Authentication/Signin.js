import React from 'react';
import './Signin.css';
import NewUserImage from '../../Images/NewUserImage.png';
import Tilt from 'react-tilt';
import longArrowIcon from '../../Images/long-arrow-alt-right-solid.svg';

const Signin = ({onRouteChange}) => {
    return (
        <div className='signin'>
            <Tilt className="Tilt" options={{ max: 50, perspective: 700 }} >
                <img src={NewUserImage} alt='New User Icon' id='signin-newuserimage' />
            </Tilt>
            <div className='signin-form'>
                <h2>Member Login</h2>
                <input type='email' name='email' placeholder='Email' />
                <input type='password' name='password' placeholder='Password' />
                <button type='submit' name='submit' value='login' onClick={()=>onRouteChange('home')}>LOGIN</button>
                <p id='forgot-password'>Forgot Username / Password?</p>
            </div>
            <div className='signin-create-account'>
                <p onClick={()=>onRouteChange('signup')}>Create your account</p>
                <img src={longArrowIcon} alt='Arrow Icon' id='signin-arrow-icon'/>
            </div>
        </div>
    );
}

export default Signin;