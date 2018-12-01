import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../store/actions/actionCreators';
export default function(ChildComponent) {
  class Authenticate extends Component {
    state = {
      login: false
    };

    componentDidMount() {
      this.checkLoginStatus();
    }

    checkLoginStatus = () => {
      let { isAuthenticated } = this.props;
      // isAuthenticated if new login or if theres localstorage
      //   isAuthenticated = localStorage.length > 0;

      // this.props.onLogin()

      console.log('is authenticated ', isAuthenticated);

      if (
        this.props.location.pathname === '/login' &&
        localStorage.length === 0
      ) {
        console.log('state login');
        this.setState({ login: true });
      } else if (!isAuthenticated) {
        console.log('not authenticated..checking jwt');

        if (localStorage.getItem('jwt')) {
          const headers = {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
          };

          axios
            .post('http://localhost:5000/api/login/authorize', null, {
              headers
            })
            .then(res => {
              console.log(res);
              this.props.onLogin(
                localStorage.getItem('uid'),
                res.data.username
              );
              this.props.history.push('/dashboard');
            })
            .catch(err => {
              // The token is invalid - make the user login again
              //   this.props.onRelog();
              this.props.history.replace('/login');
            });
        } else {
          this.props.history.replace('/login');
        }
      }
    };

    render() {
      return (
        <div>
          {this.props.isAuthenticated || this.state.login ? (
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

export const logouts = () => {
  console.log('logging out');
  //   this.props.onLogout();
};
