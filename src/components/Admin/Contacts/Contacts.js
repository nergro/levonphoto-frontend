import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Spinner from "../../UI/Spinner/Spinner";

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

  onInputChange = (input, value) => {
    this.setState({
      [input]: value
    });
  };

  postContacts = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("phone", this.state.phone);
    formData.append("email", this.state.email);

    axios
      .post("/contacts", formData)
      .then(result => {
        console.log("Contacts updated!");
        this.props.history.push("/kontaktai");
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    const content = this.state.loading ? (
      <Spinner />
    ) : this.state.error ? (
      <h1 style={{ textAlign: "center" }}>Serverio klaida.</h1>
    ) : (
      <div className="admin-login">
        <h1>Kontaktai</h1>
        <div className="contacts-form login-form">
          <form className="message-form" onSubmit={this.postContacts}>
            <div className="form-control">
              <input
                type="text"
                name="phone"
                autoComplete="off"
                placeholder="Telefono numeris"
                value={this.state.phone}
                onChange={e => this.onInputChange("phone", e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                type="email"
                name="email"
                placeholder="El. paštas"
                value={this.state.email}
                onChange={e => this.onInputChange("email", e.target.value)}
              />
            </div>

            <button type="submit" className="form-button">
              PUBLIKUOTI
            </button>
          </form>
        </div>
      </div>
    );
    return <React.Fragment>{content}</React.Fragment>;
  }
}

export default withRouter(Contacts);
