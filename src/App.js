import React, { Component } from "react";
import logo from "./instagram-logo-white.png";
import "./App.css";
import { Form, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      mainImage: logo
    };
  }
  usernameChanged = async () => {
    this.setState({ isLoading: true });

    const username = document.getElementById("input-username").value;

    const resp = await fetch(`https://www.instagram.com/${username}/`);

    if (!resp.ok || username.trim() === "") {
      this.setState({
        isLoading: false,
        mainImage: logo,
        usernameError: true
      });
      return;
    }

    const pageHtml = await resp.text();

    const imagesRegexMatch = pageHtml.match(/"https:\/\/.+?\.jpg\?.+?"/g);

    const recheckUsername = document.getElementById("input-username").value;
    if (username !== recheckUsername) {
      return;
    }

    if (Array.isArray(imagesRegexMatch) && imagesRegexMatch.length > 0) {
      const profilePicString = imagesRegexMatch[0];
      const profilePic = profilePicString.slice(1, profilePicString.length - 1);

      this.setState({
        mainImage: profilePic,
        usernameError: false
      });
    }

    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            id="main-image"
            src={this.state.mainImage}
            alt="logo"
            style={{
              marginTop: "10px",
              width: "155px",
              height: "155px",
              borderRadius: this.state.mainImage === logo ? undefined : "50%"
            }}
          />
          <h1>InstaFeedback</h1>
          <Form autoComplete="off">
            <Form.Input
              error={this.state.usernameError}
              style={{ width: "300px" }}
              id="input-username"
              loading={this.state.isLoading}
              placeholder="Username"
              onChange={this.usernameChanged}
            />
            <input id="upload" type="file" />
            <Button
              style={{
                marginTop: "10px"
              }}
            >
              Submit
            </Button>
          </Form>
        </header>
      </div>
    );
  }
}

export default App;
