import React, { Component } from "react";
import ReactDOM from "react-dom/client";

import AppHeader from "./AppHeader";
// import AppFooter from "./AppFooter";
import AppContent from "./AppContent";
import AppFooterFunctionalComponent from "./AppFooterFunctionalComponent";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.handlePostChange = this.handlePostChange.bind(this); //binding one function to another
    this.state = { posts: [] };
  }

  handlePostChange(posts) {
    this.setState({ posts: posts });
  }

  render() {
    const myProps = {
      title: "My Cool App!",
      subject: "My subject",
      favourite_color: "red",
    };
    return (
      <div className="app">
        <AppHeader
          {...myProps}
          posts={this.state.posts}
          handlePostChange={this.handlePostChange}
        />
        <AppContent
          handlePostChange={this.handlePostChange}
          posts={this.state.posts}
        />
        {/* <AppFooter /> */}
        <AppFooterFunctionalComponent myProperty={"Hello, world"} />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
