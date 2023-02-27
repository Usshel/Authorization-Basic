import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private _authenticationService: AuthenticationService, private _router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>  {
      return this._authenticationService.userCredentials$.pipe(
        map((isLoggedIn) => { 
          return isLoggedIn?.accessToken
          ? true
          : this._router.parseUrl(route.data['redirectUrl']) })
      )
  }
  
}
