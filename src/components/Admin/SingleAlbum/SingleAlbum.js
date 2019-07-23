import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Spinner from "../../UI/Spinner/Spinner";

class Gallery extends Component {
  state = {
    title: "",
    images: [],
    loading: false,
    error: false,
    albumId: ""
  };

  componentDidMount() {
    const albumId = this.props.match.params.albumId;
    this.setState({
      loading: true,
      albumId: albumId
    });
    axios
      .get("/album/" + albumId)
      .then(res => {
        this.setState({
          title: res.data.title,
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

  onMultiFilePickChange = (value, files) => {
    if (files) {
      this.setState({
        [value]: files
      });
    }
  };

  onTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", this.state.title);
    for (const image of this.state.images) {
      formData.append("image", image);
    }

    axios
      .post("/album/" + this.state.albumId + "/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(result => {
        console.log("Album created!");
        this.props.history.push("/galerija/" + this.state.albumId);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  render() {
    const content = this.state.loading ? (
      <Spinner />
    ) : this.props.error ? (
      <h1 style={{ textAlign: "center" }}>Serverio klaida.</h1>
    ) : (
      <div className="admin-login">
        <h1>Albumo redagavimas</h1>
        <div className="contacts-form login-form">
          <form className="message-form" onSubmit={this.handleSubmit}>
            <div className="form-control">
              <input
                type="text"
                name="image"
                autoComplete="off"
                placeholder="Albumo pavadinimas"
                onChange={this.onTitleChange}
                spellCheck="false"
                value={this.state.title}
              />
            </div>
            <hr />
            <div className="form-control">
              <label htmlFor="album-photos">Pridėti nuotraukų į albumą</label>
              <input
                type="file"
                multiple
                name="image"
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

export default withRouter(Gallery);
