import React from 'react';
import './Home.css';
import NewUserImage from '../Images/NewUserImage.png';

const Home = ({onRouteChange}) => {
    return (
        <div className='home'>
            <img src={NewUserImage} alt='New User Icon' id='newuserimage' />
            <div className='home-form'>
                <h2>Home Sweet Home</h2>
                <button type='submit' name='submit' value='login' onClick={()=>onRouteChange('signin')}>LOGOUT</button>
            </div>
        </div>
    );
}

export default Home;