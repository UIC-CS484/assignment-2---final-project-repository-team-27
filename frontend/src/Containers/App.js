import './App.css';
import React from 'react';
import Signin from '../Components/Authentication/Signin';
import Signup from '../Components/Authentication/Signup';
import Home from '../Components/Home';

const initialState = {
    route: 'signin',
    user: {
        id: 0,
        name: '',
        phone: '',
        email: '',
    }
}

class App extends React.Component {

    constructor() {
        super();
        this.state = initialState;
    }

    onRouteChange = (route) => {
        this.setState({ route: route });
        if (route === 'signin')
            this.setState(initialState);
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                phone: data.phone,
                email: data.email,
            }
        })
    }

    render() {
        const { route } = this.state;
        return (
            <div className="App">
                {
                    route === 'home'
                        ? <Home currentUser={this.state.user} onRouteChange={this.onRouteChange} />
                        : (route === 'signin'
                            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                            : <Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                        )
                }
            </div>
        );
    }
}

export default App;