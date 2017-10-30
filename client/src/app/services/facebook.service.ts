import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare const FB: any;
@Injectable()
export class FacebookService {

  constructor(private http : Http) {
    FB.init({
      appId: '',
      status: false, // the SDK will attempt to get info about the current user immediately after init
      cookie: false, // enable cookies to allow the server to access
      // the session
      xfbml: false,
      version: 'v2.8' // use graph api version 2.5
    });
  }

  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        console.log(result.authResponse);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (result.authResponse) {
          return this
            .http
            .post(`http://localhost:8080/auth/facebook`, {access_token: result.authResponse.accessToken})
            .toPromise()
            .then(res => {
              console.log(res.headers);
              const token = res
                .headers
                .get('x-auth-token');
              if (token) {
                localStorage.setItem('id_token', token);
              }
              resolve(res);
            });

        }
      }, {scope: 'public_profile,email'})
    });
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  isLoggedIn() {
    if (localStorage.getItem('id_token')){

    return new Promise((resolve, reject) => {
      console.log('checing if logged in');
      this
        .getCurrentUser()
        .then(user => resolve(true))
        .catch(() => reject(false));
    });
  } else{
    return new Promise((resolve, reject) => {
      reject(false);
    });
  }

  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {

      const headers = new Headers();
      headers.append('Authorization', localStorage.getItem('id_token')); // send token with request to the endpoint
      headers.append('Content-Type', 'x-auth-token');
      return this
        .http
        .get(`http://localhost:8080/auth/me`, {headers: headers})
        .toPromise()
        .then(res => {
          resolve(res);
        })
        .catch(() => reject('Not Authorized!'));
    });
  }

}
