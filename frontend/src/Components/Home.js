import React from 'react';
import './Home.css';
import Card from './Card';

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
                this.setState({ cryptoData: data });
            })
            .catch(() => {
                console.log('signin: error communicating with the server');
            })
    }

    render() {
        const { onRouteChange } = this.props;
        const { cryptoData } = this.state;
        return !cryptoData.data ?
            <h1 className='loading-sign'>Loading</h1> :
            (
                <div className='home'>
                    <Card coins={cryptoData.data.coins} />
                    <button type='submit' name='submit' value='login' onClick={() => onRouteChange('signin')}>LOGOUT</button>
                </div>
            );
    }
}

export default Home;