import React, { Component, Fragment } from "react";
import "./AppFooter.css";

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.handlePostChange = this.handlePostChange.bind(this);
  }

  handlePostChange(posts) {
    this.props.handlePostChange(posts);
  }

  render() {
    return (
      <Fragment>
        <h1>{this.props.title}</h1>
        <p>There are {this.props.posts.length} entries </p>
      </Fragment>
    );
  }
}
