import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private _httpClient: HttpClient) {
  }

  currentlyLoggedUser(): Observable<any> {
    return this._httpClient.get<any>('https://us-central1-courses-auth.cloudfunctions.net/auth/me').pipe(
      map((response) => ({
        id: response.data.user.context.user_id,
        email: response.data.user.context.email,
      })));
  }
}
