import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import AppNavbar from '../../components/AppNavbar/AppNavbar'
import './Dashboard.css';

import axios from 'axios';

export class Dashboard extends Component {
  componentDidMount() {
    if (localStorage.length === 0) {
      this.props.history.replace('/');
    } else {

      // user is accessing dashboard via the token in storage
      // TODO: == get userinfo and store to redux state (later on)
      if (!this.props.isLog) {
        this.relog();
      }

    }
  }

  // function to check whether user's token is valid and redirect them to login page if it isn't
  relog = () => {
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
      });
  }

  render() {
    return (
      <div>
        <AppNavbar history={this.props.history} />
        <h1>Welcome to the dash!</h1>
        <button onClick={this.relog} className="button">
          Log out
        </button>
        <div className="">
          <div className="wrapper">
            <div className="box graph">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Graph</span>
                  <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
                </div>
              </div>
            </div>
            <div className="box item-list">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title"> Items List</span>
                  <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
                </div>
              </div>
            </div>
            <div className="box notes">
              <div className="card  blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Notes</span>
                  <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    onLogout: () => dispatch(actionCreators.logout()),
    onRelog: () => dispatch(actionCreators.relog())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
