import React from 'react';
import './Home.css';
import Card from './Card';

class Home extends React.Component {

    constructor(props) {
        super(props);
        const { currentUser } = this.props;
        this.state = {
            searchfield: '',
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

    /*
        const { currentUser } = this.props;
        this.setState({
            userDetails: {
                userId: currentUser.id,
                userName: currentUser.name,
                userPhone: currentUser.phone,
                userEmail: currentUser.email
            }
        })
    */

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    onDeleteClick = () => {

        const { currentUser } = this.props;
       
        fetch(`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_SERVER_PORT}/delete`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: currentUser.id
            }),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(() => {
                console.log('React: Error deleting user');
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
        const { cryptoData, searchfield } = this.state;
        let filteredCryptoData;
        if (cryptoData.data) {
            filteredCryptoData = cryptoData.data.coins.filter(coin => {
                return coin.name.toLowerCase().includes(searchfield.toLowerCase());
            })
        }
        return !cryptoData.data ?
            <h1 className='loading-sign'>Loading</h1> :
            (
                <div className='home'>
                    <nav className='nav-component sticky'>
                        <input type='search' name='searchbar' placeholder='search' onChange={this.onSearchChange} />
                        <h2 className='home-name'>CRYPTOVERSE</h2>
                        <button type='submit' name='logout' value='logout'
                            onClick={() => { this.onLogoutClick(); onRouteChange('signin') }}>LOGOUT</button>
                        <button type='button' name='delete' value='delete'
                            onClick={() => { this.onDeleteClick(); onRouteChange('signin') }}>DELETE</button>
                    </nav>
                    <Card coins={filteredCryptoData} />
                </div>
            );
    }
}

export default Home;