import './App.css';
import React from 'react';
import Signin from '../Components/Authentication/Signin';
import Signup from '../Components/Authentication/Signup';
import Home from '../Components/Home';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            route: 'signin'
        }
    }

    onRouteChange = (route) => {
        this.setState({ route: route });
    }

    render() {
        const { route } = this.state;
        return (
            <div className="App">
                {
                    route === 'home'
                        ? <Home onRouteChange={this.onRouteChange} />
                        : (route === 'signin'
                            ? <Signin onRouteChange={this.onRouteChange} />
                            : <Signup onRouteChange={this.onRouteChange} />
                        )
                }
            </div>
        );
    }
}

export default App;