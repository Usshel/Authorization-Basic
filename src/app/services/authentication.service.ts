import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HasDataModel } from '../models/has-data.model';
import { CredentialsModel } from '../models/credentials.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private _loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn$: Observable<boolean> = this._loggedInSubject.asObservable();

  constructor(private _httpClient: HttpClient) {
  }

  logIn(credentials: HasDataModel<CredentialsModel>): Observable<CredentialsModel> {
    return this._httpClient.post<CredentialsModel>('https://us-central1-courses-auth.cloudfunctions.net/auth/login', credentials).pipe(
        
    );
  }
}
