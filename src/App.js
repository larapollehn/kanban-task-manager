import React, { Component } from 'react';

import './css/styles.css';
import Page from "./components/Page";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Page title={"Hello World!"} />
      </div>
    );
  }
}

export default App;
