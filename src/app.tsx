import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import "assets/css/material-dashboard-react.css?v=1.9.0";

import AppRoutes from "./app-routes"
import { connect } from 'react-redux';
import { verifyJwtToken } from "./store/actions/authentication"
import Loading from "./components/Loading/Loading.jsx"

class App extends React.Component<any, any> {
  state = {
    fetchSession: false
  }

  async componentDidMount() {
    try {
      await this.props.verifyJwtToken()
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ fetchSession: true })
    }
  }


  render() {
    return (
      // <>
      //   {this.props.isAuthenticated ?
      //     <>
      //       <BrowserRouter>
      //         <AppRoutes />
      //       </BrowserRouter>
      //     </>
      //     :
      //     <>
      //       <Loading />
      //     </>
      //   }
      // </>
      <>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </>
    );
  }
}

const mapStateToProps = ({ authentication }) => {
  return {
    isAuthenticated: authentication.isAuthenticated
  }
}

const mapDispatchToProps = {
  verifyJwtToken
}

export default connect(mapStateToProps, mapDispatchToProps)(App);