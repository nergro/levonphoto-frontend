import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { generateBase64FromImage } from "../../../util/image";
import Spinner from "../../UI/Spinner/Spinner";
import { updateServices } from "../../../store/actions/main";

class Services extends Component {
  state = {
    firstTitle: "",
    firstDescription: "",
    secondTitle: "",
    secondDescription: "",
    thirdTitle: "",
    thirdDescription: "",
    imageUrl: null,
    imagePreview: null,
    loading: false,
    error: false
  };

  componentDidMount() {
    const { services } = this.props;
    this.setState({
      firstTitle: services.firstTitle,
      firstDescription: services.firstDescription,
      secondTitle: services.secondTitle,
      secondDescription: services.secondDescription,
      thirdTitle: services.thirdTitle,
      thirdDescription: services.thirdDescription,
      loading: false
    });
  }

  onFilePickChange = (value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then(b64 => {
          this.setState({ imagePreview: b64 });
        })
        .catch(e => {
          this.setState({ imagePreview: null });
        });
    }
    if (files) {
      this.setState({
        imageUrl: files[0]
      });
    }
  };

  onInputChange = (input, value) => {
    this.setState({
      [input]: value
    });
  };

  handleSubmit = async e => {
    this.setState({
      loading: true
    });
    e.preventDefault();

    let data = {
      firstTitle: this.state.firstTitle,
      firstDescription: this.state.firstDescription,
      secondTitle: this.state.secondTitle,
      secondDescription: this.state.secondDescription,
      thirdTitle: this.state.thirdTitle,
      thirdDescription: this.state.thirdDescription
    };

    const {
      updateServices,
      history: { push }
    } = this.props;
    try {
      await updateServices(data, this.state.imageUrl);
      this.setState({
        loading: false
      });
      push("/paslaugos");
    } catch (err) {
      this.setState({
        error: true
      });
    }
  };
  render() {
    const content = this.state.loading ? (
      <Spinner />
    ) : this.state.error ? (
      <h1 style={{ textAlign: "center" }}>Serverio klaida.</h1>
    ) : (
      <div className="admin-login services-form">
        <h1>Paslaugos</h1>
        <div className="contacts-form login-form services-form">
          <form className="message-form" onSubmit={this.handleSubmit}>
            <div className="form-control">
              <p>Viršelio nuotrauka</p>
              <input
                type="file"
                name="image"
                onChange={e =>
                  this.onFilePickChange(e.target.value, e.target.files)
                }
              />
            </div>
            <div>
              {this.state.imagePreview && (
                <div
                  style={{
                    backgroundImage: `url('${this.state.imagePreview}')`,
                    backgroundSize: "cover",
                    width: "100%",
                    height: "200px"
                  }}
                />
              )}
            </div>
            <div className="form-control">
              <p>Pirma pastraipa</p>
              <input
                type="text"
                name="title-one"
                autoComplete="off"
                placeholder="Antraštė"
                spellCheck="false"
                value={this.state.firstTitle}
                onChange={e => this.onInputChange("firstTitle", e.target.value)}
              />
            </div>
            <div className="form-control">
              <textarea
                type="text"
                name="description-one"
                placeholder="Aprašymas"
                spellCheck="false"
                value={this.state.firstDescription}
                onChange={e =>
                  this.onInputChange("firstDescription", e.target.value)
                }
                rows="4"
              />
            </div>

            <div className="form-control">
              <p>Antra pastraipa</p>
              <input
                type="text"
                name="title-two"
                autoComplete="off"
                placeholder="Antraštė"
                spellCheck="false"
                value={this.state.secondTitle}
                onChange={e =>
                  this.onInputChange("secondTitle", e.target.value)
                }
              />
            </div>
            <div className="form-control">
              <textarea
                type="text"
                name="description-two"
                placeholder="Aprašymas"
                spellCheck="false"
                value={this.state.secondDescription}
                onChange={e =>
                  this.onInputChange("secondDescription", e.target.value)
                }
                rows="4"
              />
            </div>

            <div className="form-control">
              <p>Trečia pastraipa</p>
              <input
                type="text"
                name="title-three"
                autoComplete="off"
                placeholder="Antraštė"
                spellCheck="false"
                value={this.state.thirdTitle}
                onChange={e => this.onInputChange("thirdTitle", e.target.value)}
              />
            </div>
            <div className="form-control">
              <textarea
                type="text"
                name="description-three"
                placeholder="Aprašymas"
                spellCheck="false"
                value={this.state.thirdDescription}
                onChange={e =>
                  this.onInputChange("thirdDescription", e.target.value)
                }
                rows="4"
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
  return {
    services: state.main.services
  };
};

const mapDispatchToProps = {
  updateServices
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Services));
