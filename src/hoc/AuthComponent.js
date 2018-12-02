import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../store/actions/actionCreators';

export default function(ChildComponent) {
  class Authenticate extends Component {
    componentDidMount() {
      this.checkLoginStatus();
    }

    // Check the login status of the user - there are 3 cases
    // 1: The user visits /login for the first time/ has just logged out. In which case
    // onLogout is triggered
    // 2: The user is not authenticated so check if there is
    // a valid jwt and do appropriate logic
    checkLoginStatus = async () => {
      const jwt = localStorage.getItem('jwt');
      const { isAuthenticated, history } = this.props;
      if (
        localStorage.length === 0 &&
        this.props.location.pathname === '/login'
      ) {
        console.log('logout');
        this.props.onLogout();
      } else if (!isAuthenticated) {
        //   } else if (!isAuthenticated && localStorage.getItem('jwt')) {
        console.log('check jwt');
        if (!jwt) {
          history.replace('/login');
          return;
        }
        const headers = {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        };

        try {
          const { data } = await axios.post(
            'http://localhost:5000/api/login/authorize',
            null,
            {
              headers
            }
          );
          this.props.onLogin(localStorage.getItem('uid'), data.username);
        } catch (err) {
          // the token is invalid
          history.replace('/login');
          this.props.onLogout();
        }
      }
    };

    render() {
      // render login only if there is no local localStorage
      return (
        <div>
          {this.props.isAuthenticated ||
          (this.props.location.pathname === '/login' &&
            localStorage.length === 0) ? (
            <ChildComponent {...this.props} />
          ) : null}
        </div>
      );
    }
  }
  const mapStateToProps = state => {
    return {
      isAuthenticated: state.login.isLoggedIn
    };
  };

  const mapDispatchToProps = dispatch => ({
    onLogin: (userId, user) => dispatch(actionCreators.login(userId, user)),
    onLogout: () => dispatch(actionCreators.logout())
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate);
}
