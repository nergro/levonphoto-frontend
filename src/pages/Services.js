import React, { Component } from "react";
import axios from "axios";

import Header from "../components/Header/Header";
import ServicesComponent from "../components/Services/Services";
import Footer from "../components/Footer/Footer";

class Services extends Component {
  state = {
    services: null,
    loading: false,
    error: false
  };
  componentDidMount() {
    this.setState({
      loading: true
    });
    axios
      .get("/services")
      .then(res => {
        this.setState({
          services: res.data.services[0],
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: true
        });
      });
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <ServicesComponent
          services={this.state.services}
          loading={this.state.loading}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Services;
