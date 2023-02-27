import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IsLoggedCredentialsModel } from '../models/is-logged-credentials.model';
import { HasDataModel } from '../models/has-data.model';
import { CredentialsModel } from '../models/credentials.model';
import { UserDataModel } from '../models/user-data.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {


  private _userCredentialsSubject: BehaviorSubject<IsLoggedCredentialsModel | null> = new BehaviorSubject<IsLoggedCredentialsModel | null>(
    {
      id: localStorage.getItem('id'),
      accessToken: localStorage.getItem('token'),
      refreshToken: localStorage.getItem('refreshToken')
    });
  public userCredentials$: Observable<IsLoggedCredentialsModel | null> = this._userCredentialsSubject.asObservable();



  constructor(private _httpClient: HttpClient) {
  }

  public logIn(credentials: HasDataModel<CredentialsModel>): Observable<UserDataModel> {
    return this._httpClient.post<HasDataModel<UserDataModel>>('https://us-central1-courses-auth.cloudfunctions.net/auth/login', credentials).pipe(
      map((response) => ({
        id: response.data.id,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })),
      tap((response) => {
          this._userCredentialsSubject.next(response),
          this.saveUserCredentialsInStorage(response)
          
      }
      ),

    );
  }

  private saveUserCredentialsInStorage(credentials: UserDataModel): void {
    localStorage.setItem('token', credentials.accessToken)
    localStorage.setItem('id', credentials.id)
    localStorage.setItem('refreshToken', credentials.refreshToken)
  }


  public logoutUser(): void {
    this._userCredentialsSubject.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('id')
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this._httpClient.post
      <HasDataModel<UserDataModel>>('https://us-central1-courses-auth.cloudfunctions.net/auth/refresh', { data: { refreshToken: refreshToken } },).pipe(
        map((response) => ({
          id: response.data.id,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })),
        tap(((response) => this.saveUserCredentialsInStorage(response)))
      ); //model on post is what we post or what we will recieve in response
  }

 
}















// public logIn(credentials: HasDataModel<CredentialsModel>): Observable<CredentialsModel> {
  //   return this._httpClient.post<CredentialsModel>('https://us-central1-courses-auth.cloudfunctions.net/auth/login', credentials).pipe(
  //     tap((userData) => {
  //       this._loggedInSubject.next(true)
  //       localStorage.setItem('isLoggedIn', 'true'),
  //       userData ? this._userCredentialsSubject.next(userData) : null
  //     }),

  //   );
  // }
