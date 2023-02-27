import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private _authenticationService: AuthenticationService, private _router: Router) {
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> {
    return this._authenticationService.userCredentials$.pipe(
      map((isLoggedIn) => { 
        return !isLoggedIn?.accessToken
        ? true
        : this._router.parseUrl(route.data['redirectUrl']) })
    )
  }


  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  //   Observable<boolean | UrlTree> {
  //   return this._authenticationService.loggedIn$.pipe(
  //     map((isLoggedIn) => { 
  //       return isLoggedIn === route.data['expectedState'] 
  //       ? true
  //       : this._router.parseUrl(route.data['redirectUrl']) })
  //   )
  // }
}
