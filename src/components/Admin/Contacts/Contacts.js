import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { URL } from "../../../services/levonDB";
import { updContacts } from "../../../store/actions/main";

import Spinner from "../../UI/Spinner/Spinner";

class Contacts extends Component {
  state = {
    email: "",
    phone: "",
    errorMessage: ""
  };
  // componentDidMount() {
  //   this.setState({
  //     loading: true
  //   });
  //   axios
  //     .get("/contacts")
  //     .then(res => {
  //       this.setState({
  //         loading: false,
  //         phone: res.data.contacts[0].phone,
  //         email: res.data.contacts[0].email
  //       });
  //     })
  //     .catch(err => {
  //       this.setState({
  //         error: true,
  //         loading: false
  //       });
  //     });
  // }
  componentDidMount() {
    const { contacts } = this.props;
    this.setState({
      email: contacts.email,
      phone: contacts.phone
    });
  }

  onInputChange = (input, value) => {
    this.setState({
      [input]: value
    });
  };

  postContacts = async e => {
    this.setState({
      loding: true
    });
    e.preventDefault();
    const data = {
      phone: this.state.phone,
      email: this.state.email
    };
    await this.props.updContacts(data);
    this.props.history.push("/kontaktai");
    // axios
    //   .post(`${URL}/contacts`, data)
    //   .then(result => {
    //     console.log("Contacts updated!");
    //     this.setState({
    //       loding: false
    //     });
    //     this.props.history.push("/kontaktai");
    //   })
    //   .catch(err => {
    //     console.log(err.message);
    //     this.setState({
    //       loading: false,
    //       error: true,
    //       errorMessage: "Atnaujinti kontaktų nepavyko"
    //     });
    //   });
  };

  render() {
    const { error, contacts } = this.props;

    return (
      <React.Fragment>
        {contacts ? (
          <div className="admin-login">
            <h1>Kontaktai</h1>
            {this.state.error && this.state.errorMessage.length > 1 ? (
              <div className="validate">
                <p>{this.state.errorMessage}</p>
              </div>
            ) : null}
            <div className="contacts-form login-form">
              <form className="message-form" onSubmit={this.postContacts}>
                <div className="form-control">
                  <input
                    type="text"
                    name="phone"
                    autoComplete="off"
                    placeholder="Telefono numeris"
                    spellCheck="false"
                    value={this.state.phone}
                    onChange={e => this.onInputChange("phone", e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <input
                    type="email"
                    name="email"
                    placeholder="El. paštas"
                    spellCheck="false"
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
        ) : error ? (
          <h1 style={{ textAlign: "center" }}>Serverio klaida.</h1>
        ) : (
          <Spinner />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.main.contacts,
    error: state.main.error
  };
};

const mapDispatchToProps = {
  updContacts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Contacts));
