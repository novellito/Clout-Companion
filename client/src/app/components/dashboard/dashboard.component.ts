import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService } from '../../services/facebook.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public currentUser : any = {};

  constructor(private facebookService: FacebookService, private router: Router) { }
  
  ngOnInit() {
    this.facebookService.getCurrentUser().then(profile => this.currentUser = profile)
        .catch(() => this.currentUser = {});
  }

  logout() {
    this.facebookService.logout();
    this.router.navigate(['/welcome']);
  }

  
}
