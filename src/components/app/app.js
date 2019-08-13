import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";

import "./index.scss";

import Main from "../../pages/Main";
import Services from "../../pages/Services";
import Contacts from "../../pages/Contacts";
import Gallery from "../../pages/Gallery";
import Album from "../../pages/Album";

import AdminMain from "../../pages/admin/Main";
import AdminLogin from "../../pages/admin/Login";
import AdminHome from "../../pages/admin/Home";
import AdminServices from "../../pages/admin/Services";
import AdminGallery from "../../pages/admin/Gallery";
import AdminContacts from "../../pages/admin/Contacts";
import AdminSingleAlbum from "../../pages/admin/SingleAlbum";
import Error from "../UI/error";
import Spinner from "../UI/Spinner/Spinner";

class App extends Component {
  componentDidMount() {
    const { checkUser } = this.props;
    checkUser();
  }
  render() {
    const { loading, isAuth } = this.props;
    return (
      <SimpleReactLightbox>
        {loading ? (
          <Spinner />
        ) : (
          <div className="App">
            {isAuth ? (
              <Switch>
                <Route
                  path="/galerija/:albumId/edit"
                  component={AdminSingleAlbum}
                />
                <Route path="/galerija" exact component={Gallery} />
                <Route path="/galerija/:albumId" component={Album} />
                <Route path="/admin/pagrindinis" component={AdminHome} />
                <Route path="/admin/paslaugos" component={AdminServices} />
                <Route path="/admin/galerija" component={AdminGallery} />
                <Route path="/admin/kontaktai" component={AdminContacts} />
                <Route path="/admin" component={AdminMain} />
                <Route path="/paslaugos" component={Services} />
                <Route path="/kontaktai" component={Contacts} />

                <Route path="/login" component={AdminLogin} />
                <Route path="/" exact component={Main} />
                <Route render={() => <Error>Puslapis nerastas.</Error>} />
              </Switch>
            ) : (
              <Switch>
                <Route path="/paslaugos" component={Services} />
                <Route path="/kontaktai" component={Contacts} />
                <Route path="/galerija" exact component={Gallery} />
                <Route path="/galerija/:albumId" component={Album} />
                <Route path="/login" component={AdminLogin} />
                <Route path="/" exact component={Main} />
                <Route render={() => <Error>Puslapis nerastas.</Error>} />
              </Switch>
            )}
          </div>
        )}
      </SimpleReactLightbox>
    );
  }
}

export default App;
