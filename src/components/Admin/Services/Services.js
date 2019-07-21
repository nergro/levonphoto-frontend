import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { generateBase64FromImage } from "../../../util/image";

class Services extends Component {
  state = {
    firstTitle: "",
    firstDescription: "",
    secondTitle: "",
    secondDescription: "",
    thirdTitle: "",
    thirdDescription: "",
    imageUrl: "",
    imagePreview: null
  };

  componentDidMount() {
    axios
      .get("/services")
      .then(res => {
        const services = res.data.services[0];
        this.setState({
          firstTitle: services.firstTitle,
          firstDescription: services.firstDescription,
          secondTitle: services.secondTitle,
          secondDescription: services.secondDescription,
          thirdTitle: services.thirdTitle,
          thirdDescription: services.thirdDescription
        });
      })
      .catch(err => {
        console.log(err);
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

  handleFirstTitleChange = e => {
    this.setState({
      firstTitle: e.target.value
    });
  };
  handleFirstDescriptionChange = e => {
    this.setState({
      firstDescription: e.target.value
    });
  };
  handleSecondTitleChange = e => {
    this.setState({
      secondTitle: e.target.value
    });
  };
  handleSecondDescriptionChange = e => {
    this.setState({
      secondDescription: e.target.value
    });
  };
  handleThirdTitleChange = e => {
    this.setState({
      thirdTitle: e.target.value
    });
  };
  handleThirdDescriptionChange = e => {
    this.setState({
      thirdDescription: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.imageUrl);
    formData.append("firstTitle", this.state.firstTitle);
    formData.append("firstDescription", this.state.firstDescription);
    formData.append("secondTitle", this.state.secondTitle);
    formData.append("secondDescription", this.state.secondDescription);
    formData.append("thirdTitle", this.state.thirdTitle);
    formData.append("thirdDescription", this.state.thirdDescription);

    axios
      .post("/services", formData)
      .then(result => {
        console.log("Services created!");
        this.props.history.push("/paslaugos");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  render() {
    return (
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
            <div className="new-post__preview-image">
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
                value={this.state.firstTitle}
                onChange={this.handleFirstTitleChange}
              />
            </div>
            <div className="form-control">
              <textarea
                type="text"
                name="description-one"
                placeholder="Aprašymas"
                value={this.state.firstDescription}
                onChange={this.handleFirstDescriptionChange}
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
                value={this.state.secondTitle}
                onChange={this.handleSecondTitleChange}
              />
            </div>
            <div className="form-control">
              <textarea
                type="text"
                name="description-two"
                placeholder="Aprašymas"
                value={this.state.secondDescription}
                onChange={this.handleSecondDescriptionChange}
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
                value={this.state.thirdTitle}
                onChange={this.handleThirdTitleChange}
              />
            </div>
            <div className="form-control">
              <textarea
                type="text"
                name="description-three"
                placeholder="Aprašymas"
                value={this.state.thirdDescription}
                onChange={this.handleThirdDescriptionChange}
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
  }
}

export default withRouter(Services);
