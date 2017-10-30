import { FacebookService } from '../services/facebook.service';
import { Injectable } from '@angular/core';
import {CanActivate, Router , ActivatedRouteSnapshot,RouterStateSnapshot, Route} from '@angular/router';

@Injectable()
export class AnonymousGuard implements CanActivate {

    constructor(private userService: FacebookService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkLogin();
    }

    checkLogin(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.userService.isLoggedIn().then(() => {
                this.router.navigate(['/dashboard']);
                reject(false);
            }).catch(() => {
                resolve(true);
                console.log('anonynousee');
            });
        });
    }
}