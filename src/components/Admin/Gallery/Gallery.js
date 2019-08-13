import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../UI/Spinner/Spinner";
import { createAlbum } from "../../../store/actions/main";

class Gallery extends Component {
  state = {
    title: "",
    images: [],
    loading: false,
    error: false,
    errorMessage: ""
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

  handleSubmit = async e => {
    this.setState({
      loading: true
    });
    e.preventDefault();
    const { createAlbum, history } = this.props;
    const { title, images } = this.state;

    const imgArr = [...images];
    if (imgArr.length >= 3) {
      try {
        await createAlbum(imgArr, title);
        this.setState({
          loading: false
        });
        history.push("/galerija");
      } catch (err) {
        this.setState({
          loading: false,
          error: true,
          errorMessage: "Sukurti albumo nepavyko"
        });
      }
    } else {
      this.setState({
        error: true,
        errorMessage: "Albumą turi sudaryti bent trys nuotraukos"
      });
    }
    // this.setState({
    //   loading: true
    // });
    // Promise.all(
    //   imgArr.map(image => {
    //     const formData = new FormData();
    //     const uniqueFileName = image.name + "-" + new Date().toISOString();

    //     formData.append("file", image);
    //     formData.append("tags", "albums");
    //     formData.append("upload_preset", "pqfkiqsm");
    //     formData.append("api_key", "315826331834584");
    //     formData.append("timestamp", (Date.now() / 1000) | 0);
    //     formData.append("public_id", `albums/${uniqueFileName}`);
    //     return axios
    //       .post(
    //         "https://api.cloudinary.com/v1_1/dvrfxqcuv/image/upload",
    //         formData,
    //         {
    //           headers: { "X-Requested-With": "XMLHttpRequest" }
    //         }
    //       )
    //       .then(response => {
    //         const dbData = {
    //           imageUrl: response.data.secure_url,
    //           publicId: response.data.public_id
    //         };
    //         return dbData;
    //       })
    //       .catch(err => err);
    //   })
    // )
    //   .then(res => {
    //     const data = {
    //       title: this.state.title,
    //       images: res
    //     };
    //     return axios.post("/album", data);
    //   })
    //   .then(res => {
    //     this.setState({
    //       loading: false
    //     });
    //     this.props.history.push("/galerija");
    //   })
    //   .catch(err => {
    // this.setState({
    //   loading: false,
    //   error: true,
    //   errorMessage: "Sukurti albumo nepavyko"
    // });
    //   });
  };

  render() {
    const content = this.state.loading ? (
      <Spinner />
    ) : (
      <div className="admin-login">
        <h1>Albumo sukūrimas</h1>
        {this.state.error ? (
          <div className="validate">
            <p>{this.state.errorMessage}</p>
          </div>
        ) : null}
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
    return <React.Fragment>{content}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  createAlbum
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Gallery));
