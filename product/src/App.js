import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { Router } from 'react-router'
import DevTools from './DevTools'
import { Route } from 'react-router'
import ProductDashBoard from './product/component/ProductDashboard';

const Product = () => <div className="App">
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
    </p>
</div>;

class App extends Component {
    render() {
        return (
            <div>
                <Provider store={this.props.store} >
                    <Router history={this.props.history}>
                        <Route path={'/'} component={ProductDashBoard} />
                    </Router>
                </Provider>
                <DevTools/>
            </div>
        );
    }
}

export default App;
