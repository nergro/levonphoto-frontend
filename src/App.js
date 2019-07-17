import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SimpleReactLightbox from 'simple-react-lightbox';
import './index.scss';

import Main from './pages/Main';
import Services from './pages/Services';
import Contacts from './pages/Contacts';
import Gallery from './pages/Gallery';
import Album from './pages/Album';
import AdminMain from './pages/admin/Main';
import AdminLogin from './pages/admin/Login';

class App extends Component {
  render() {
    return (
      <SimpleReactLightbox>
        <div className='App'>
          <Switch>
            <Route path='/paslaugos' component={Services} />
            <Route path='/kontaktai' component={Contacts} />
            <Route path='/galerija' exact component={Gallery} />
            <Route path='/galerija/:id' component={Album} />
            <Route path='/admin' component={AdminMain} />
            <Route path='/login' component={AdminLogin} />
            <Route path='/' component={Main} />
          </Switch>
        </div>
      </SimpleReactLightbox>
    );
  }
}

export default App;
