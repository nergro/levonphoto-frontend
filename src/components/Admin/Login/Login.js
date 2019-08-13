import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as actions from "../../../store/actions";
import { login } from "../../../store/actions/auth";
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
    const data = {
      name: this.state.name,
      password: this.state.password
    };
    this.props.login(data).then(() => {
      this.props.history.push("/admin");
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div className="admin-login">
            <h1>Prisijungti</h1>
            {/* {this.props.message.length > 0 ? (
            <p style={{ color: "red" }}>{this.props.message}</p>
          ) : null} */}
            <div className="contacts-form login-form">
              <form className="message-form" onSubmit={this.handleLogin}>
                <div className="form-control">
                  <input
                    type="text"
                    name="name"
                    placeholder="Prisijungimo vardas"
                    onChange={e => this.onInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <input
                    type="password"
                    name="password"
                    placeholder="Slaptažodis"
                    onChange={e =>
                      this.onInputChange("password", e.target.value)
                    }
                    required
                  />
                </div>

                <button type="submit" className="form-button">
                  PRISIJUNGTI
                </button>
              </form>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    loading: state.auth.loading
  };
};
const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
