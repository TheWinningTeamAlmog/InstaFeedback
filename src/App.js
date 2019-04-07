import React, { Component } from "react";
import logo from "./instagram-logo-white.png";
import "./App.css";
import {
  Form,
  Button,
  Comment,
  Header,
  Label,
  Icon,
  Menu
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import abbreviate from "number-abbreviate";

let avatars = [
  "Ade",
  "Christian",
  "Daniel",
  "Elliot",
  "Helen",
  "Jenny",
  "Joe",
  "Justen",
  "Laura",
  "Matt",
  "Nan",
  "Steve",
  "Stevie",
  "Tom",
  "Veronika",
  "Zoe"
];

const title = (
  <h1
    style={{ marginTop: "10px", cursor: "pointer" }}
    onClick={() => {
      window.location = "/";
    }}
  >
    Insta
    <img src={logo} style={{ width: "0.75em" }} />
    Feedback
  </h1>
);

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

    this.setState({ username });

    if (Array.isArray(imagesRegexMatch) && imagesRegexMatch.length > 0) {
      const profilePicString = imagesRegexMatch[0];
      const profilePic = profilePicString.slice(1, profilePicString.length - 1);

      this.setState({
        mainImage: profilePic,
        usernameError: false
      });
    }
  };

  readFile = () => {
    const file = document.getElementById("file-upload").files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        this.setState({ uploadedImageB64: reader.result });
      },
      false
    );

    reader.readAsDataURL(file);
  };

  submit = async () => {
    this.setState({ loadingAPI: true });

    const resp = await fetch(
      "https://eu-gb.functions.cloud.ibm.com/api/v1/web/shmueljacobs%40gmail.com_dev/default/GuessData.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fileBase64: this.state.uploadedImageB64
            .split(",")
            .slice(1)
            .join(","),
          user: this.state.username
        })
      }
    );

    const respJson = await resp.json();

    this.setState({ comments: respJson.comments, likes: respJson.likes });
  };

  render() {
    let body;

    if (
      Array.isArray(this.state.comments) &&
      Number.isInteger(this.state.likes)
    ) {
      avatars = avatars.sort(() => 0.5 - Math.random());

      body = (
        <div className="App">
          <header className="App-header">
            {title}
            <img
              src={this.state.uploadedImageB64}
              alt="logo"
              style={{
                marginTop: "10px",
                maxHeight: "600px",
                maxWidth: `${window.innerWidth - 10}px`
              }}
            />
            <Comment.Group style={{ textAlign: "initial" }}>
              <Header as="h3" style={{ color: "white" }}>
                <Menu compact>
                  <Menu.Item>
                    <Icon name="comments" /> Comments
                    <Label color="red" floating>
                      3
                    </Label>
                  </Menu.Item>
                  <Menu.Item>
                    <Icon name="heart" /> Likes
                    <Label color="teal" floating>
                      {abbreviate(this.state.likes, 1)}
                    </Label>
                  </Menu.Item>
                </Menu>
              </Header>

              <Comment>
                <Comment.Avatar
                  src={`https://react.semantic-ui.com/images/avatar/small/${avatars[0].toLowerCase()}.jpg`}
                />
                <Comment.Content>
                  <Comment.Author style={{ color: "white" }} as="a">
                    {avatars[0]}
                  </Comment.Author>
                  <Comment.Metadata style={{ color: "lightgrey" }}>
                    <div>Today at 5:42PM</div>
                  </Comment.Metadata>
                  <Comment.Text style={{ color: "white" }}>
                    {this.state.comments[0]}
                  </Comment.Text>
                </Comment.Content>
              </Comment>

              <Comment>
                <Comment.Avatar
                  src={`https://react.semantic-ui.com/images/avatar/small/${avatars[1].toLowerCase()}.jpg`}
                />
                <Comment.Content>
                  <Comment.Author style={{ color: "white" }} as="a">
                    {avatars[1]}
                  </Comment.Author>
                  <Comment.Metadata style={{ color: "lightgrey" }}>
                    <div>Yesterday at 12:30AM</div>
                  </Comment.Metadata>
                  <Comment.Text style={{ color: "white" }}>
                    {this.state.comments[1]}
                  </Comment.Text>
                </Comment.Content>
              </Comment>

              <Comment>
                <Comment.Avatar
                  src={`https://react.semantic-ui.com/images/avatar/small/${avatars[2].toLowerCase()}.jpg`}
                />
                <Comment.Content>
                  <Comment.Author style={{ color: "white" }} as="a">
                    {avatars[2]}
                  </Comment.Author>
                  <Comment.Metadata style={{ color: "lightgrey" }}>
                    <div>5 days ago</div>
                  </Comment.Metadata>
                  <Comment.Text style={{ color: "white" }}>
                    {this.state.comments[2]}
                  </Comment.Text>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </header>
        </div>
      );
    } else {
      let img;
      if (this.state.mainImage === logo) {
        img = (
          <img
            src={this.state.mainImage}
            alt="logo"
            style={{
              marginTop: "10px",
              width: "155px",
              height: "155px"
            }}
          />
        );
      } else {
        img = (
          <a
            href={`https://www.instagram.com/${this.state.username}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={this.state.mainImage}
              alt="logo"
              style={{
                marginTop: "10px",
                width: "155px",
                height: "155px",
                borderRadius: "50%"
              }}
              onLoad={() => this.setState({ isLoading: false })}
            />
          </a>
        );
      }

      body = (
        <div className="App">
          <header className="App-header">
            {img}
            {title}
            <Form autoComplete="off">
              <Form.Input
                error={this.state.usernameError}
                style={{ width: "300px" }}
                id="input-username"
                loading={this.state.isLoading}
                placeholder="Username"
                onChange={this.usernameChanged}
              />

              <Label as="label" basic htmlFor="file-upload">
                <Button
                  icon="upload"
                  label={{
                    basic: true,
                    content: "Photo"
                  }}
                  labelPosition="right"
                />
                <input
                  hidden
                  id="file-upload"
                  accept="image/*"
                  type="file"
                  onChange={this.readFile}
                />
              </Label>
              <br />
              <Button
                loading={this.state.loadingAPI}
                onClick={this.submit}
                style={{ marginTop: "10px" }}
                disabled={
                  !this.state.uploadedImageB64 ||
                  !this.state.username ||
                  this.state.usernameError
                }
                color={
                  !(
                    !this.state.uploadedImageB64 ||
                    !this.state.username ||
                    this.state.usernameError
                  )
                    ? "green"
                    : undefined
                }
              >
                Submit
              </Button>
            </Form>
          </header>
        </div>
      );
    }
    return body;
  }
}

export default App;
