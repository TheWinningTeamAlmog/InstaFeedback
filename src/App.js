import React, { Component } from "react";
import logo from "./instagram-logo-balck-white.png";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>InstaFeedback</h1>
          <img src={logo} alt="logo" style={{ filter: "invert(100%)" }} />
        </header>
      </div>
    );
  }
}

export default App;
