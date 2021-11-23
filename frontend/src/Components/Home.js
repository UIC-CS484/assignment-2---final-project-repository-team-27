import React from 'react';
import './Home.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        const { currentUser } = this.props;
        this.state = {
            userDetails: {
                userId: currentUser.id,
                userName: currentUser.name,
                userPhone: currentUser.phone,
                userEmail: currentUser.email,
            },
            cryptoData: {}
        }
        console.log(this.state.userDetails);
    }

    componentDidMount() {
        fetch('http://localhost:3001/home')
            .then(response => response.json())
            .then(data => {
                this.setState({ cryptoData: data});
            })
          .catch( () => {
            console.log('signin: error communicating with the server');
        })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className='home'>
                <div className='home-form'>
                    <h2>Welcome home, {this.state.userDetails.userName}!</h2>
                    <button type='submit' name='submit' value='login' onClick={() => onRouteChange('signin')}>LOGOUT</button>
                </div>
            </div>
        );
    }
}

export default Home;