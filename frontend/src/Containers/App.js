import './App.css';
import React from 'react';
import Signin from '../Components/Authentication/Signin';
import Signup from '../Components/Authentication/Signup';
import Home from '../Components/Home';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            route: 'signin',
            user: {
                id: 0,
                name: '',
                phone: 0,
                email: '',
                joined: ''
            }
        }
    }

    onRouteChange = (route) => {
        this.setState({ route: route });
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                phone: data.phone,
                email: data.email,
                joined: data.joined
            }
        })
    }

    render() {
        const { route } = this.state;
        return (
            <div className="App">
                {
                    route === 'home'
                        ? <Home id={this.state.user.id} 
                        name={this.state.user.name} 
                        phone={this.state.user.phone}
                        email={this.state.user.email}
                        joined={this.state.user.joined}
                        onRouteChange={this.onRouteChange} />
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