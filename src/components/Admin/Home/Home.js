import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Spinner from "../../../components/UI/Spinner/Spinner";

class Home extends Component {
  state = {
    images: [],
    loading: false
  };

  onMultiFilePickChange = (value, files) => {
    if (files) {
      this.setState({
        [value]: files
      });
    }
  };

  handleSubmit = e => {
    this.setState({
      loading: true
    });
    e.preventDefault();
    const formData = new FormData();

    for (const image of this.state.images) {
      formData.append("image", image);
    }
    axios
      .post("/home", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log("Home images created!");
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  handleImageRemoval = () => {
    if (window.confirm("Ar tikrai norite ištrinti?")) {
      axios
        .delete("/home/images")
        .then(res => {
          this.props.history.push("/");
        })
        .catch(err => {
          alert("Ištrinti nepavyko");
        });
    }
  };
  render() {
    const content = this.state.loading ? (
      <Spinner />
    ) : (
      <div className="admin-login">
        <h1>Pagrindinis puslapis</h1>
        <button
          className="form-button delete-button"
          onClick={this.handleImageRemoval}
        >
          IŠTRINTI VISAS NUOTRAUKAS
        </button>
        <hr className="form-divider" />
        <div className="contacts-form login-form">
          <form className="message-form" onSubmit={this.handleSubmit}>
            <div className="form-control">
              <label htmlFor="home-photos">Įkelti nuotraukas</label>
              <input
                type="file"
                multiple
                name="home-photos"
                onChange={e =>
                  this.onMultiFilePickChange("images", e.target.files)
                }
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

export default withRouter(Home);
