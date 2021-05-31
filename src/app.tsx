import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import "assets/css/material-dashboard-react.css?v=1.9.0";

import AppRoutes from "./app-routes"

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
  }
}

export default App;