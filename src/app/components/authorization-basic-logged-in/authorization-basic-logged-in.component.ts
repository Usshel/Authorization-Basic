import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IsLoggedCredentialsModel } from 'src/app/models/is-logged-credentials.model';
import { MeDataModel } from 'src/app/models/me-data.model';
import { UserDataModel } from '../../models/user-data.model';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-authorization-basic-logged-in',
  templateUrl: './authorization-basic-logged-in.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationBasicLoggedInComponent {
  readonly userData$: Observable<IsLoggedCredentialsModel | null> = this._authenticationService.userCredentials$;

  readonly meDetails$: Observable<MeDataModel> =  this._userService.currentlyLoggedUser();

 


  constructor(private _authenticationService: AuthenticationService, private _userService: UserService, private _cd: ChangeDetectorRef) {
  }

  logoutFromSession(): void {
    this._authenticationService.logoutUser();
    this._cd.markForCheck();
  }

  
 
}
