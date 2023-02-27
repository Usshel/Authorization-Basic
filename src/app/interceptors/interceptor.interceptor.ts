import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take, tap, timeout } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserDataModel } from '../models/user-data.model';
import { IsLoggedCredentialsModel } from '../models/is-logged-credentials.model';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  private credentials$: Observable<IsLoggedCredentialsModel | null> = this._authenticationService.userCredentials$;

  constructor(private _authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): 
  Observable<HttpEvent<unknown>> {
      const token = localStorage.getItem('token')

      const updatedRequest: HttpRequest<any> = request.clone({setHeaders: {Authorization:`Bearer ${token}`}})
      updatedRequest.headers.set('Authorization', `Bearer ${token}`)
      return next.handle(updatedRequest);
   
   
  }
}
