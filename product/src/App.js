import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Router } from 'react-router'
import DevTools from './DevTools'
import { Route } from 'react-router'
import ProductDashBoard from './product/component/ProductDashboard';

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
