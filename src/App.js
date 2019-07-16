import React, { Component } from 'react';
import SimpleReactLightbox from 'simple-react-lightbox';
import './index.scss';
import Header from './components/Header/Header';
import Featured from './components/Featured/Featured';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <SimpleReactLightbox>
        <div className='App'>
          <Header />

          <Featured />

          <Footer />
        </div>
      </SimpleReactLightbox>
    );
  }
}

export default App;
