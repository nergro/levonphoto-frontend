import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Spinner from "../../../components/UI/Spinner/Spinner";

class Home extends Component {
  state = {
    images: [],
    loading: false,
    error: false,
    errorMessage: ""
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
    const imgArr = [...this.state.images];
    Promise.all(
      imgArr.map(image => {
        const formData = new FormData();
        const uniqueFileName = image.name + "-" + new Date().toISOString();

        formData.append("file", image);
        formData.append("tags", "home");
        formData.append("upload_preset", "pqfkiqsm");
        formData.append("api_key", "315826331834584");
        formData.append("timestamp", (Date.now() / 1000) | 0);
        formData.append("public_id", `home/${uniqueFileName}`);
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
        const images = { images: res };
        return axios.post("/home", images);
      })
      .then(res => {
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: true,
          errorMessage: "Įkelti nuotraukų nepavyko"
        });
      });
  };

  handleImageRemoval = () => {
    this.setState({
      loading: true
    });
    if (window.confirm("Ar tikrai norite ištrinti?")) {
      axios
        .delete("/home/images")
        .then(res => {
          this.setState({
            loading: false
          });
          this.props.history.push("/");
        })
        .catch(err => {
          this.setState({
            loading: false,
            error: true,
            errorMessage: "Nepavyko ištrinti nuotraukų"
          });
        });
    }
  };
  render() {
    const content = this.state.loading ? (
      <Spinner />
    ) : (
      <div className="admin-login">
        <h1>Pagrindinis puslapis</h1>
        {this.state.error ? (
          <div className="validate">
            <p>{this.state.errorMessage}</p>
          </div>
        ) : null}
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
