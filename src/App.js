import React, { Component } from 'react';
import './index.scss';
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <h1>Hello</h1>
      </div>
    );
  }
}

export default App;
