import React from "react";
import "../stylesheets/main.scss";

import { Grid } from 'react-bootstrap';

// app component
export default class App extends React.Component {
  // render
  render() {
    return (
      <Grid fluid={true}>
        {this.props.children}
      </Grid>
    );
  }
}
