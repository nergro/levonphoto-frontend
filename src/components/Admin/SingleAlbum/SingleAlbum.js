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
    albumId: "",
    errorMessage: ""
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
    this.setState({
      loading: true
    });
    e.preventDefault();

    const imgArr = [...this.state.images];
    if (imgArr.length > 0) {
      Promise.all(
        imgArr.map(image => {
          const formData = new FormData();
          const uniqueFileName = image.name + "-" + new Date().toISOString();

          formData.append("file", image);
          formData.append("tags", "albums");
          formData.append("upload_preset", "pqfkiqsm");
          formData.append("api_key", "315826331834584");
          formData.append("timestamp", (Date.now() / 1000) | 0);
          formData.append("public_id", `albums/${uniqueFileName}`);
          return axios
            .post(
              "https://api.cloudinary.com/v1_1/dvrfxqcuv/image/upload",
              formData,
              {
                headers: { "X-Requested-With": "XMLHttpRequest" }
              }
            )
            .then(response => {
              const dbData = {
                imageUrl: response.data.secure_url,
                publicId: response.data.public_id
              };
              return dbData;
            })
            .catch(err => err);
        })
      )
        .then(res => {
          const data = {
            albumId: this.state.albumId,
            title: this.state.title,
            images: res
          };
          return axios.post("/album/" + this.state.albumId + "/edit", data);
        })
        .then(res => {
          this.setState({
            loading: false
          });
          this.props.history.push("/galerija/" + this.state.albumId);
        })
        .catch(err => {
          this.setState({
            loading: false,
            error: true,
            errorMessage: "Atnaujinti albumo nepavyko"
          });
        });
    } else {
      const data = {
        albumId: this.state.albumId,
        title: this.state.title
      };
      axios
        .post("/album/" + this.state.albumId + "/edit", data)
        .then(res => {
          this.setState({
            loading: false
          });
          this.props.history.push("/galerija/" + this.state.albumId);
        })
        .catch(err => {
          this.setState({
            loading: false,
            error: true,
            errorMessage: "Atnaujinti albumo nepavyko"
          });
        });
    }
  };

  render() {
    const content = this.state.loading ? (
      <Spinner />
    ) : this.props.error ? (
      <h1 style={{ textAlign: "center" }}>Serverio klaida.</h1>
    ) : (
      <div className="admin-login">
        <h1>Albumo redagavimas</h1>
        {this.state.error ? (
          <div className="validate">
            <p>{this.state.errorMessage}</p>
          </div>
        ) : null}
        <div className="contacts-form login-form">
          <form className="message-form" onSubmit={this.handleSubmit}>
            <div className="form-control">
              <label htmlFor="title">Albumo pavadinimas</label>
              <input
                type="text"
                name="title"
                autoComplete="off"
                placeholder="Albumo pavadinimas"
                onChange={this.onTitleChange}
                spellCheck="false"
                value={this.state.title}
                style={{ marginTop: "0.5rem" }}
              />
            </div>
            <hr />
            <div className="form-control">
              <label htmlFor="image">Pridėti nuotraukų į albumą</label>
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
