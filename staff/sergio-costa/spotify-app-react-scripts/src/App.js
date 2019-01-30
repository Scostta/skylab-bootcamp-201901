import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HelloWorld from './components/HelloWorld'
import FeedBack from './components/Feedback'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <HelloWorld name="Sergio"/>
          <FeedBack message="default feedback"/>
          <FeedBack message="warn feedback" level="warn"/>
          <FeedBack message="alert feedback" level="alert"/>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
