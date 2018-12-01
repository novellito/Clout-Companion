import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ChildComponent) {
  class Authenticate extends Component {
    componentDidMount() {
      this.checkLoginStatus();
    }

    checkLoginStatus = () => {
      let { isAuthenticated } = this.props;
      // isAuthenticated if new login or if theres localstorage
      //   isAuthenticated = localStorage.length > 0;

      console.log(isAuthenticated);
      //   console.log(this.props.location);
      if (!isAuthenticated) {
        console.log('not authenticated');
        this.props.history.replace('/login');
      }
    };

    render() {
      return (
        <div>
          {this.props.isAuthenticated ? (
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

  return connect(mapStateToProps)(Authenticate);
}
