import React, { Component } from "react";
import axios from "axios";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ContactsData from "../components/Contacts/Contacts";

class Contacts extends Component {
  state = {
    loading: false,
    error: false,
    email: "",
    phone: ""
  };
  componentDidMount() {
    this.setState({
      loading: true
    });
    axios
      .get("/contacts")
      .then(res => {
        this.setState({
          loading: false,
          phone: res.data.contacts[0].phone,
          email: res.data.contacts[0].email
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          loading: false
        });
      });
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <ContactsData
          loading={this.state.loading}
          error={this.state.error}
          email={this.state.email}
          phone={this.state.phone}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Contacts;
