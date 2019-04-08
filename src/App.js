import React, { Component } from "react";
import logo from "./instagram-logo-black.png";
import alon from "./alon.jpg";
import sagi from "./sagi.jpg";
import kobi from "./kobi.jpg";
import adam from "./adam.jpg";
import elisha from "./elisha.jpg";
import yehuda from "./yehuda.jpg";
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
  ["Alon", alon],
  ["Adam", adam],
  ["Yehuda", yehuda],
  ["Sagi", sagi],
  ["Kobi", kobi],
  ["Elisha", elisha]
];

const title = (
  <h1
    style={{ marginTop: "10px", cursor: "pointer" }}
    onClick={() => {
      window.location = window.location;
    }}
  >
    Insta
    <img alt="" src={logo} style={{ width: "0.75em" }} />
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

    if (!resp.ok) {
      this.setState({ loadingAPI: false });
      return;
    }

    const respJson = await resp.json();

    this.setState({
      comments: respJson.comments,
      likes: respJson.likes,
      tags: respJson.tags
    });
  };

  render() {
    let body;

    if (
      Array.isArray(this.state.comments) &&
      Number.isInteger(this.state.likes)
    ) {
      avatars = avatars.sort(() => 0.5 - Math.random());

      const tags = this.state.tags
        .slice(0, 2)
        .concat("maple story")
        .map((t, i) => {
          t = t.replace(/ /g, "_");
          return (
            <a
              key={i}
              href={`https://www.instagram.com/explore/tags/${t}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              #{t}{" "}
            </a>
          );
        });

      const comments = this.state.comments
        .slice(0, Math.min(3, this.state.comments.length))
        .map((c, i) => {
          return (
            <Comment key={i}>
              <Comment.Avatar src={avatars[i][1]} />
              <Comment.Content>
                <Comment.Author as="a">{avatars[i][0]}</Comment.Author>
                <Comment.Metadata>
                  <div>
                    Today at {Math.floor(Math.random() * 11) + 1}:
                    {Math.floor(Math.random() * 5) + 1}2PM
                  </div>
                </Comment.Metadata>
                <Comment.Text>{c}</Comment.Text>
              </Comment.Content>
            </Comment>
          );
        });

      body = (
        <div className="App">
          <header
            className="App-header"
            style={{ overflow: "-webkit-paged-y" }}
          >
            {title}
            <img
              src={this.state.uploadedImageB64}
              alt=""
              style={{
                marginTop: "10px",
                maxHeight: "600px",
                maxWidth: `${window.innerWidth - 10}px`
              }}
            />
            <h2>Social Projections:</h2>
            <span style={{ marginBottom: "10px" }}>{tags}</span>
            <Comment.Group
              style={{ textAlign: "initial", fontSize: "x-large" }}
            >
              <Header as="h3">
                <Menu compact>
                  <Menu.Item>
                    <Icon name="comments" /> Comments
                    <Label color="teal" floating>
                      {this.state.comments.length}
                    </Label>
                  </Menu.Item>
                  <Menu.Item>
                    <Icon name="heart" /> Likes
                    <Label color="red" floating>
                      {abbreviate(this.state.likes, 1)}
                    </Label>
                  </Menu.Item>
                </Menu>
              </Header>

              {comments}
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
                color="blue"
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
