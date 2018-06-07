import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Logout from './LogoutBtn';
import TwitterLogin from 'react-twitter-auth';
export default class Login extends Component {
  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    user: ''
  };
  componentDidMount() {
    console.log(localStorage);
  }
  responseFacebook = response => {
    console.log(response);

    console.log(localStorage);
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email
    });
  };

  onSuccess = res => {
    console.log(res);
    const token = res.headers.get('x-auth-token');
    res.json().then(user => {
      console.log(user);
      this.setState({ isAuthenticated: true, user: user, token: token });
    });
  };

  componentClicked = () => console.log('clicked');

  render() {
    // let fbContent;

    // if (this.state.isLoggedIn) {
    //   fbContent = (
    //     <div
    //       style={{
    //         width: '400px',
    //         margin: 'auto',
    //         background: '#f4f4f4',
    //         padding: '20px'
    //       }}
    //     >
    //       <h2>Welcome {this.state.name}</h2>
    //       Email: {this.state.email}
    //     </div>
    //   );
    // } else {
    //   fbContent = (
    //     <FacebookLogin
    //       appId="141550886485387"
    //       autoLoad={false}
    //       fields="name,email"
    //       onClick={this.componentClicked}
    //       callback={this.responseFacebook}
    //     />
    //   );
    // }
    {
      /* {fbContent} */
    }

    let content = !!this.state.isAuthenticated ? (
      <div>
        <p>Authenticated</p>
        <div>{this.state.user.username}</div>
        <div>{this.state.user.userId}</div>
        <div>
          <button onClick={this.logout} className="button">
            Log out
          </button>
        </div>
      </div>
    ) : (
      <TwitterLogin
        loginUrl="http://localhost:5000/api/login/auth/twitter"
        onFailure={this.onFailed}
        onSuccess={this.onSuccess}
        requestTokenUrl="http://localhost:5000/api/login/auth/twitter/reverse"
      />
    );

    return <div className="App">{content}</div>;
  }
}
