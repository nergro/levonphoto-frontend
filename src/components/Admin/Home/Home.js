import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Home extends Component {
  state = {
    images: []
  };

  onMultiFilePickChange = (value, files) => {
    if (files) {
      this.setState({
        [value]: files
      });
    }
  };

  handleSubmit = e => {
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
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  render() {
    return (
      <div className="admin-login">
        <h1>Pagrindinis puslapis</h1>
        <div className="contacts-form login-form">
          <form className="message-form" onSubmit={this.handleSubmit}>
            <div className="form-control">
              <label htmlFor="home-photos">
                Pagrindinio puslapio nuotraukos
              </label>
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
  }
}

export default withRouter(Home);
