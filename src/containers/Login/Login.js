import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

import axios from 'axios';
import { Col, Row } from 'react-materialize';
import FacebookLogin from 'react-facebook-login';
import TwitterLogin from 'react-twitter-auth';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import './Login.css';

class Login extends Component {
  componentDidMount() {
    localStorage.clear();
  }
  // call back function after fb button is clicked
  // Redirects user if they login
  onFBLogin = async res => {
    console.log(res);
    if (res.status === undefined && !res.name) {
      console.log('user not authenticated');
    } else {
      this.props.onLogin(res.userID, res.name);

      const headers = {
        'Content-Type': 'application/json'
      };
      try {
        const axiosPost = await axios.post(
          'http://localhost:3000/api/login/facebook',
          JSON.stringify({ fb: true, username: res.name, id: res.userID }),
          { headers }
        );
        localStorage.setItem('jwt', axiosPost.headers['x-auth-token']);
        localStorage.setItem('uid', axiosPost.data.uid);
        this.props.history.push('/dashboard');
        console.log(localStorage);
        console.log(axiosPost);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // called when a twitter connection has been established
  // Redirects user if they login
  onTwitSuccess = async res => {
    const token = res.headers.get('x-auth-token');
    const { status, userId, username } = await res.json();
    // user has declined authorization
    if (status) {
      console.log('user not authenticated');
    } else {
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('uid', userId);
      console.log(localStorage);
      this.props.onLogin(userId, username);
      this.props.history.push('/dashboard');
    }
  };

  // callback function to log when a twitter user fails to login
  onTwitFail = err => {
    console.log('user not authenticated');
  };

  test = async () => {
    const headers = {
      Authorization: `Bearer ${this.state.tempTok}`,
      'Content-Type': 'application/json'
    };
    try {
      let response = await axios.post(
        'http://localhost:5000/api/login/test',
        { message: 'hello' },
        { headers }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
   
    const icon = (
      <Fragment>
        <i className="fa fa-twitter" />Login with Twitter
      </Fragment>
    );
    return (
      <div>
        <AppNavbar />
        <Row>
          <Col m={6} l={4} s={12} offset="m3 l4">
         
            <div className="card log-card">
              <div className="card-content ">
                <p className="log-3">Login</p>
                <div className="btn-container">
                  <div>
                    <TwitterLogin
                      loginUrl="http://localhost:5000/api/login/auth/twitter"
                      onFailure={this.onTwitFail}
                      onSuccess={this.onTwitSuccess}
                      requestTokenUrl="http://localhost:5000/api/login/auth/twitter/reverse"
                      className="twit-btn"
                      showIcon={false}
                      children={icon}
                      text="Login with Twitter"
                    />
                  </div>
                  <div>
                    <FacebookLogin
                      appId="141550886485387"
                      autoLoad={false}
                      fields="name"
                      callback={this.onFBLogin}
                      icon="fa-facebook"
                      cssClass="fb-btn"
                      textButton="Login with Facebook"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
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
      dispatch({ type: actionTypes.USER_LOGIN, userData: { userId, user } }),
    onLogout: () => dispatch({ type: actionTypes.USER_LOGOUT })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
