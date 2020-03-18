import React, { Component } from 'react';

import './css/styles.css';
import Page from "./components/Page";

import { Provider } from 'react-redux';

let configureStore : Function;

if(process.env.NODE_ENV === 'development'){
    configureStore = require('./store/configureStore.dev').configureStore;
}else{
    configureStore = require('./store/configureStore.prod').configureStore;
}

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider value={store}>
        <div className="App">
          <Page title={"Hello World!"} />
        </div>
      </Provider>
    );
  }
}

export default App;
