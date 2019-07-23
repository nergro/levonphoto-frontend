import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Gallery extends Component {
  state = {
    title: "",
    albumCover: "",
    firstHidden: "",
    secondHidden: "",
    images: []
  };

  onFilePickChange = (value, files) => {
    if (files) {
      this.setState({
        [value]: files[0]
      });
    }
  };

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
    formData.append("image", this.state.albumCover);
    formData.append("image", this.state.firstHidden);
    formData.append("image", this.state.secondHidden);
    for (const image of this.state.images) {
      formData.append("image", image);
    }

    axios
      .post("/album", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(result => {
        console.log("Album created!");
        this.props.history.push("/galerija");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  render() {
    return (
      <div className="admin-login">
        <h1>Albumo sukūrimas</h1>
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
              />
            </div>
            <div className="form-control">
              <label htmlFor="album-cover">Albumo pagrindinė nuotrauka</label>
              <input
                type="file"
                name="image"
                onChange={e =>
                  this.onFilePickChange("albumCover", e.target.files)
                }
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="album-behind-one">Albumo antrinė nuotrauka</label>
              <input
                type="file"
                name="image"
                onChange={e =>
                  this.onFilePickChange("firstHidden", e.target.files)
                }
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="album-behind-two">Albumo tretinė nuotrauka</label>
              <input
                type="file"
                name="image"
                onChange={e =>
                  this.onFilePickChange("secondHidden", e.target.files)
                }
                required
              />
            </div>
            <hr />
            <div className="form-control">
              <label htmlFor="album-photos">Albumo nuotraukos</label>
              <input
                type="file"
                multiple
                name="image"
                onChange={e =>
                  this.onMultiFilePickChange("images", e.target.files)
                }
                required
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

export default withRouter(Gallery);
