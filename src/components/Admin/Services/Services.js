import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { generateBase64FromImage } from "../../../util/image";
import Spinner from "../../UI/Spinner/Spinner";

class Services extends Component {
  state = {
    firstTitle: "",
    firstDescription: "",
    secondTitle: "",
    secondDescription: "",
    thirdTitle: "",
    thirdDescription: "",
    imageUrl: "",
    imagePreview: null,
    loading: false,
    error: false
  };

  componentDidMount() {
    this.setState({
      loading: true
    });
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
          thirdDescription: services.thirdDescription,
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

  handleSubmit = e => {
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

    if (this.state.imageUrl) {
      const formData = new FormData();
      const uniqueFileName =
        this.state.imageUrl.name + "-" + new Date().toISOString();

      formData.append("file", this.state.imageUrl);
      formData.append("tags", "home");
      formData.append("upload_preset", "pqfkiqsm");
      formData.append("api_key", "315826331834584");
      formData.append("timestamp", (Date.now() / 1000) | 0);
      formData.append("public_id", `services/${uniqueFileName}`);

      axios
        .post(
          "https://api.cloudinary.com/v1_1/dvrfxqcuv/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" }
          }
        )
        .then(response => {
          data.imageUrl = response.data.secure_url;
          data.publicId = response.data.public_id;
          return axios.post("/services", data);
        })
        .then(res => {
          this.setState({
            loading: false
          });
          this.props.history.push("/paslaugos");
          console.log("Services updated!");
        })
        .catch(err => {
          this.setState({
            loading: false
          });
          console.log(err.message);
        });
    } else {
      axios
        .post("/services", data)
        .then(result => {
          this.setState({
            loading: false
          });
          this.props.history.push("/paslaugos");
          console.log("Services updated!");
        })
        .catch(err => {
          this.setState({
            loading: false
          });
          console.log(err.message);
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

export default withRouter(Services);
