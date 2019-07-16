import React, { Component } from 'react';
import './index.scss';
import Header from './components/Header/Header';
import Featured from './components/Featured/Featured';
import SimpleReactLightbox from 'simple-react-lightbox'; // Import Simple React Lightbox

class App extends Component {
  render() {
    return (
      <SimpleReactLightbox>
        <div className='App'>
          <Header />

          <Featured />

          <h1>Hello</h1>
        </div>
      </SimpleReactLightbox>
    );
  }
}

export default App;
