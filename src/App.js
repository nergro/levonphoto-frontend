import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SimpleReactLightbox from 'simple-react-lightbox';
import './index.scss';

import Main from './pages/Main';
import Services from './pages/Services';

class App extends Component {
  render() {
    return (
      <SimpleReactLightbox>
        <div className='App'>
          <Switch>
            <Route path='/paslaugos' component={Services} />

            <Route path='/' component={Main} />
          </Switch>
        </div>
      </SimpleReactLightbox>
    );
  }
}

export default App;
