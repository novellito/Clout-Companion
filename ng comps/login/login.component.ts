import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService } from '../../services/facebook.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private facebookService: FacebookService, private router: Router) { }

  ngOnInit() {
  }

  fbLogin() {
    this.facebookService.fbLogin().then(() => {
      console.log('User has been logged in');
      this.router.navigate(['/dashboard']);
    });  }

}
