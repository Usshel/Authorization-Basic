import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authorization-basic-logged-in',
  templateUrl: './authorization-basic-logged-in.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationBasicLoggedInComponent {
  constructor(private _authenticationService: AuthenticationService) {
  }

   logoutFromSession(): void {
    this._authenticationService.logoutUser();
  }
}
