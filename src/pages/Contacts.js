import React, { Component } from "react";
import axios from "axios";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ContactsData from "../components/Contacts/Contacts";

class Contacts extends Component {
  state = {
    loading: false,
    error: false,
    contactsEmail: "",
    contactsPhone: "",

    name: "",
    email: "",
    subject: "",
    message: "",
    emailSending: false,
    emailSendError: false,
    emailSent: false
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
          contactsPhone: res.data.contacts[0].phone,
          contactsEmail: res.data.contacts[0].email
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          loading: false
        });
      });
  }

  onInputChange = (input, value) => {
    this.setState({
      [input]: value
    });
  };

  handleEmailSend = () => {
    this.setState({
      emailSending: true
    });
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("subject", this.state.subject);
    formData.append("message", this.state.message);

    axios
      .post("/sendemail", formData)
      .then(res => {
        this.setState({
          emailSending: false,
          emailSent: true
        });
      })
      .catch(err => {
        this.setState({
          emailSending: false,
          emailSendError: true,
          emailSent: false
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <ContactsData
          loading={this.state.loading}
          error={this.state.error}
          email={this.state.contactsEmail}
          phone={this.state.contactsPhone}
          onChange={this.onInputChange}
          onSubmit={this.handleEmailSend}
          emailSending={this.state.emailSending}
          emailError={this.state.emailSendError}
          emailSent={this.state.emailSent}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Contacts;
