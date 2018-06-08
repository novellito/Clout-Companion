import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

import FacebookLogin from 'react-facebook-login';
import Logout from './LogoutBtn';
import TwitterLogin from 'react-twitter-auth';
import AppNavbar from '../../components/AppNavbar/AppNavbar';

class Login extends Component {
  state = {
    isLoggedIn: false,
    userId: '',
    user: ''
  };

  // call back function after fb button is clicked
  onFBLogin = res => {
    console.log(res);
    if (res.status === undefined && !res.name) {
      console.log('user not authenticated');
    } else {
      this.props.onLogin(res.userID, res.name);
      // this.setState({
      //   isLoggedIn: true,
      //   userId: res.userID,
      //   user: res.name
      // });
      fetch('http://localhost:3000/api/login/facebook', {
        body: JSON.stringify({ username: res.name, id: res.userID }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        method: 'POST'
      }).then(res => {
        // add redirection to dashboard
        console.log(res);
      });
    }
  };

  // called when a twitter connection has been established
  onTwitSuccess = async res => {
    console.log(res);
    const token = res.headers.get('x-auth-token');
    const user = await res.json();
    // user has declined authorization
    if (user.status) {
      console.log('user not authenticated');
    } else {
      this.props.onLogin(user.userID, user.username);
      // this.setState({ isLoggedIn: true, user: user });
    }
    console.log(user);
  };
  onTwitFail = err => {
    console.log('user not authenticated');
  };

  logout = () => {
    this.setState({ isLoggedIn: false, user: '' });
  };

  render() {
    let fbContent;
    console.log(this.props);
    if (this.props.isLog) {
      fbContent = (
        <div
          style={{
            width: '400px',
            margin: 'auto',
            background: '#f4f4f4',
            padding: '20px'
          }}
        >
          <h2>Welcome {this.props.uname}</h2>
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="141550886485387"
          autoLoad={false}
          fields="name"
          callback={this.onFBLogin}
        />
      );
    }

    let content = !!this.props.isLog ? (
      <div>
        <p>Authenticated</p>
        <div>{this.props.uname.user}</div>
        <div>{this.props.uid}</div>
        <div>
          <button onClick={this.logout} className="button">
            Log out
          </button>
        </div>
      </div>
    ) : (
      <TwitterLogin
        loginUrl="http://localhost:5000/api/login/auth/twitter"
        onFailure={this.onTwitFail}
        onSuccess={this.onTwitSuccess}
        requestTokenUrl="http://localhost:5000/api/login/auth/twitter/reverse"
      />
    );

    return (
      <div>
        <AppNavbar />
        {content}
        {fbContent}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLog: state.login.isLoggedIn,
    uid: state.login.userId,
    uname: state.login.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (userId, user) =>
      dispatch({ type: actionTypes.USER_LOGIN, userData: { userId, user } })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
