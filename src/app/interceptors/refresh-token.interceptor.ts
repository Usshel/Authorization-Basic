import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, Subject, switchMap, tap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  

  constructor(private _authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const refreshToken = localStorage.getItem('refreshToken')
  
      return next.handle(request).pipe(
        catchError((error) => {
          console.log(error)
          if (error.status === 403) {
            if (refreshToken) {
              return this._authenticationService.refreshToken(refreshToken).pipe(
                switchMap((response) => {
                  const updatedRequest = request.clone({ setHeaders: { Authorization: `Bearer ${response.accessToken} `}})
                  return next.handle(updatedRequest)
                }
                )
              )
            }
          }
          return throwError(() => error)
        })
      )
      
    }

   
 



}
