import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { removeHomeImages, uploadImages } from "../../../store/actions/main";

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

  handleSubmit = async e => {
    const {
      history: { push },
      uploadImages
    } = this.props;
    this.setState({
      loading: true
    });
    e.preventDefault();
    const imgArr = [...this.state.images];
    try {
      await uploadImages(imgArr, "home");
      this.setState({
        loading: false
      });
      push("/");
    } catch (err) {
      this.setState({
        error: true,
        loading: false
      });
    }
  };

  handleImageRemoval = async () => {
    const {
      history: { push },
      removeHomeImages
    } = this.props;
    this.setState({
      loading: true
    });
    if (window.confirm("Ar tikrai norite ištrinti?")) {
      try {
        await removeHomeImages();
        push("/");
      } catch (err) {
        this.setState({
          error: true,
          errorMessage: "Nepavyko ištrinti nuotraukų"
        });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
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
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  removeHomeImages,
  uploadImages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));
