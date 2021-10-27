import React from 'react';
import './Home.css';
import NewUserImage from '../Images/NewUserImage.png';

class Home extends React.Component {

    constructor(props) {
        super(props);
        const { id, name, phone, email, joined } = this.props;
        this.state = {
            userDetails: {
                userId: id,
                userName: name,
                userPhone: phone,
                userEmail: email,
                userJoined: joined
            }
        }
        console.log(this.state.userDetails);
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className='home'>
                <img src={NewUserImage} alt='New User Icon' id='newuserimage' />
                <div className='home-form'>
                    <h2>Welcome home, {this.state.userDetails.userName}!</h2>
                    <button type='submit' name='submit' value='login' onClick={() => onRouteChange('signin')}>LOGOUT</button>
                </div>
            </div>
        );
    }
}

export default Home;