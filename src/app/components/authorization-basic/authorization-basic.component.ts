import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-authorization-basic',
  templateUrl: './authorization-basic.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationBasicComponent {
  readonly login: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private _authenticationService: AuthenticationService, private _router: Router, private _changDetector: ChangeDetectorRef ){}
  onLoginSubmitted(loginForm: FormGroup): void {
    this._authenticationService.logIn({
      data: {
        email: loginForm.value.email,
        password: loginForm.value.password
      }
    }).subscribe({
      error:(err) => {
        return loginForm.setErrors({
          valid: err.error.message
        }),
        this._changDetector.markForCheck()
      }
    }
    );
  }
}
