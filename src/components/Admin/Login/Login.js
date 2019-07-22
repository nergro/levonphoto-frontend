import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Spinner from "../../UI/Spinner/Spinner";

class Login extends Component {
  state = {
    name: "",
    password: ""
  };
  onInputChange = (input, value) => {
    this.setState({
      [input]: value
    });
  };

  handleLogin = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("password", this.state.password);
    this.props.login(formData);
  };
  render() {
    const content = this.props.loading ? (
      <Spinner />
    ) : this.props.isAuth ? (
      <Redirect to="/admin" />
    ) : (
      <div className="admin-login">
        <h1>Prisijungti</h1>
        <div className="contacts-form login-form">
          <form className="message-form" onSubmit={this.handleLogin}>
            <div className="form-control">
              <input
                type="text"
                name="name"
                placeholder="Prisijungimo vardas"
                onChange={e => this.onInputChange("name", e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                name="password"
                placeholder="Slaptažodis"
                onChange={e => this.onInputChange("password", e.target.value)}
              />
            </div>

            <button type="submit" className="form-button">
              PRISIJUNGTI
            </button>
          </form>
        </div>
      </div>
    );
    return <React.Fragment>{content}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    loading: state.auth.loading,
    error: state.auth.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: formData => dispatch(actions.login(formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
