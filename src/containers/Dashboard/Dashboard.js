import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import * as actionTypes from '../../store/actions/actionTypes';
import axios from 'axios';

class Dashboard extends Component {
  componentDidMount() {
    // if (!this.props.isLog) {
    if (!this.props.isLog && localStorage.length === 0) {
      this.props.history.replace('/');
    }
  }

  logout = () => {
    this.props.onLogout();
    this.props.history.replace('/');
  };
  render() {
    return (
      <div>
        <AppNavbar />
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
    onLogout: () => dispatch({ type: actionTypes.USER_LOGOUT })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
