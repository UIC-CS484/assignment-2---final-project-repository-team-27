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
    }

    componentDidMount() {

        fetch(`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_SERVER_PORT}/home`)
            .then(response => response.json())
            .then(data => {
                this.setState({ cryptoData: data });
            })
            .catch(() => {
                console.log('signin: error communicating with the server');
            })
            
    }

    onLogoutClick = () => {

        fetch(`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_SERVER_PORT}/logout`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(() => {
                console.log('React: Error deleting session');
            })

    }

    render() {
        const { onRouteChange } = this.props;
        const { cryptoData } = this.state;
        return !cryptoData.data ?
            <h1 className='loading-sign'>Loading</h1> :
            (
                <div className='home'>
                    <nav className='nav-component'>
                        <h2 className='home-name'>CRYPTOVERSE</h2>
                        <button type='submit' name='logout' value='login' 
                        onClick={() => { onRouteChange('signin'); this.onLogoutClick() } }>LOGOUT</button>
                    </nav>
                    <Card coins={cryptoData.data.coins} />
                </div>
            );
    }
}

export default Home;