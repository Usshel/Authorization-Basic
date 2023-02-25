import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HasDataModel } from '../models/has-data.model';
import { CredentialsModel } from '../models/credentials.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private _loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!localStorage.getItem('isLoggedIn'));
  public loggedIn$: Observable<boolean> = this._loggedInSubject.asObservable();

  constructor(private _httpClient: HttpClient) {
  }

  public logIn(credentials: HasDataModel<CredentialsModel>): Observable<CredentialsModel> {
    return this._httpClient.post<CredentialsModel>('https://us-central1-courses-auth.cloudfunctions.net/auth/login', credentials).pipe(
      tap(() => {
        this._loggedInSubject.next(true)
        localStorage.setItem('isLoggedIn', 'true')
      })
    );
  }

  public logoutUser(): void {
    this._loggedInSubject.next(false);
  }
}
