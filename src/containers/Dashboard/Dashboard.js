import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import AppNavbar from '../../components/AppNavbar/AppNavbar'

import axios from 'axios';

class Dashboard extends Component {
  componentDidMount() {
    if (localStorage.length === 0) {
      this.props.history.replace('/');
    } else {

      // user is accessing dashboard via the token in storage
      // TODO: == get userinfo and store to redux state (later on)
      if (!this.props.isLog) {

        const headers = {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        };
        axios.post(
          'http://localhost:5000/api/login/authorize',
          null
          ,
          { headers }
        )
          .then((res) => console.log(res))
          .catch(err => {// The token is invalid - make the user login again
            this.props.onRelog();
            this.props.history.replace('/login');
            // output a message 
          });
      }

    }
  }

  render() {
    return (
      <div>
        <AppNavbar history={this.props.history} />

        <h1>Welcome to the dash!</h1>
        <button onClick={this.logout} className="button">
          Log out
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLog: state.login.isLoggedIn,
    uid: state.login.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch({ type: actionTypes.USER_LOGOUT }),
    onRelog: () => dispatch({ type: actionTypes.USER_RELOG })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
