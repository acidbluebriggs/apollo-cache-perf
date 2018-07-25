import React, { Component } from 'react';
import {Page} from './Page'

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>Cache Example</h1>
        <Page /> {/* This does nothing in this demo */}
      </div>
    );
  }
}

export default App;
