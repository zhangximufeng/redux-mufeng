import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connectMu } from 'redux-Mu';
import FetchUsage from './FetchUsage';

class App extends Component {
  render() {
    console.log(this.props.MuState);
    const { count = {} } = this.props.MuState;
    const { data: countNum = 0 } = count;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
            <button onClick={() => this.props.setMuState({ stateName: 'count', data: countNum + 1 })}>count + 1</button>
            <span>count: { countNum }</span>
            <button onClick={() => this.props.setMuState({ stateName: 'count', data: countNum - 1 })}>count - 1</button>
          </div>
          <FetchUsage />
        </header>
      </div>
    );
  }
}

export default connectMu()(App);
