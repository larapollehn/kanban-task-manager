import React from 'react';
import { Provider } from 'react-redux';

import './css/styles.css';
import Page from "./components/Page";
import store from './stores/store';

export default function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Page/>
            </div>
        </Provider>
    );
}
