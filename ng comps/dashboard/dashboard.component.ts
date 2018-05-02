import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FacebookService} from '../../services/facebook.service';

@Component({selector: 'app-dashboard', templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.scss']})
export class DashboardComponent implements OnInit {

  public currentUser : any = {};
  constructor(private facebookService : FacebookService, private router : Router) {}

  ngOnInit() {
    this
      .facebookService
      .getCurrentUser()
      .then((profile:any ) => {
        const body = JSON.parse(profile._body);
        console.log(body.facebook.email);
        this.currentUser = body.facebook.email;
      })
      .catch((err) => err);
  }

  logout() {
    this
      .facebookService
      .logout();
    this
      .router
      .navigate(['/']);
  }

}
