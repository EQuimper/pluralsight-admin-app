// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';

import Header from './common/Header';

const { object } = PropTypes;

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: object.isRequired
};

export default App;
