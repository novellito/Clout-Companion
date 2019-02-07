import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import axios from 'axios';
import { Col, Row } from 'react-materialize';
import FacebookLogin from 'react-facebook-login';
import TwitterLogin from 'react-twitter-auth';
import './Login.css';

export class Login extends Component {
  componentDidMount() {
    if (this.props.isLog) this.props.history.push('/dashboard');
  }

  // call back function after fb button is clicked
  // Redirects user if they login
  onFBLogin = async res => {
    if (res.status === undefined || !res.name) {
      console.log('user not authenticated');
    } else {
      this.props.setUser(res.userID, res.name);
      const headers = {
        'Content-Type': 'application/json'
      };
      try {
        const axiosPost = await axios.post(
          '/api/login/facebook',
          JSON.stringify({ fb: true, username: res.name, id: res.userID }),
          { headers }
        );
        console.log(axiosPost);
        localStorage.setItem('jwt', axiosPost.headers['x-auth-token']);
        localStorage.setItem('uid', axiosPost.data.uid);
        this.props.history.push('/dashboard');
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
      localStorage.setItem('jwt', token);
      localStorage.setItem('uid', userId);
      this.props.setUser(userId, username);
      this.props.history.push('/dashboard'); // maybe move this to reducer
    }
  };

  // callback function to log when a twitter user fails to login
  onTwitFail = err => {
    console.log('user not authenticated');
  };

  render() {
    const icon = (
      <Fragment>
        <i className="fa fa-twitter" />
        Login with Twitter
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
                {this.props.toRelog ? 'Session expired please login again' : ''}
                <div className="btn-container">
                  <div>
                    <TwitterLogin
                      loginUrl="/api/login/auth/twitter"
                      onFailure={this.onTwitFail}
                      onSuccess={this.onTwitSuccess}
                      requestTokenUrl="/api/login/auth/twitter/reverse"
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
    uname: state.login.user,
    toRelog: state.login.needToRelog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (userId, user) => dispatch(actionCreators.setUser(userId, user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
