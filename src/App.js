import React from 'react';
import { Provider } from 'react-redux';


import '../public/stylo.css';
import store from './stores/store';
import Home from "./components/Home";

export default function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Home/>
            </div>
        </Provider>
    );
}
