import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authenticationService.currentUserValue;

        if (!currentUser) {
            // Not logged in, so redirect to the login page with the return URL
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

        // Logged in, so allow access to the route
        return true;
    }
}