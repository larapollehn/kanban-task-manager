import React, { Component } from 'react';

import './css/styles.css';
import Page from "./components/Page";

import { Provider } from 'react-redux';

let configureStore : Function;

if(process.env.NODE_ENV === 'development'){
    configureStore = require('./store/configureStore.dev.js').configureStore;
}else{
    configureStore = require('./store/configureStore.prod.js').configureStore;
}

const store = configureStore();

export default function App() {
    return (
      <Provider store={store}>
        <div className="App">
          <Page title={"Hello World!"} />
        </div>
      </Provider>
    );
}
