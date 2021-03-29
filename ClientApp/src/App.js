import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Administration } from "./components/Administration";
import { Login } from "./components/Login";
import { Seznam } from "./components/Seznam";
import { ReactReader } from "react-reader";
import { ReaderComponent } from "./components/Reader/ReaderComponent";
import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/Administration" component={Administration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/Seznam" component={Seznam} />
        <Route exact path="/book/:id" component={ReaderComponent} />
      </Layout>
    );
  }
}
