import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route} from '@angular/router';
import { FacebookService } from '../services/facebook.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private facebookService: FacebookService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkLogin();
    }

    checkLogin(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.facebookService.isLoggedIn().then((res) => {
                resolve(true);
            }).catch((e) => {

                this.router.navigate(['/']);
                console.log('why u rejecting');
                reject(false);
            });
        });
    }
}