import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorizationBasicComponent } from './components/authorization-basic/authorization-basic.component';
import { AuthorizationBasicLoggedInComponent } from './components/authorization-basic-logged-in/authorization-basic-logged-in.component';
import { AuthorizationBasicComponentModule } from './components/authorization-basic/authorization-basic.component-module';
import { AuthorizationBasicLoggedInComponentModule } from './components/authorization-basic-logged-in/authorization-basic-logged-in.component-module';
import { LoginGuard } from './guards/login-guard/login.guard';
import { LoginAutoChildComponent } from './components/login-auto-child/login-auto-child.component';
import { LoggedInGuard } from './guards/login-guard/logged-in.guard';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'auto-login/login', 
    component: AuthorizationBasicComponent,
    canActivate: [LoginGuard],
    data: {
      redirectUrl: 'auto-login/logged-in',
      expectedState: null
    }
   }, 
    { path: 'auto-login', 
      children:[
        {
          path: 'am-i-logged',
          component: LoginAutoChildComponent
        },
        {
          path: 'logged-in',
          component: AuthorizationBasicLoggedInComponent
        }
      ],
      canActivate: [LoggedInGuard], 
      data: {
        redirectUrl:'auto-login/login',
        expectedState: true
      } 
    }
  ]), 
    
    AuthorizationBasicComponentModule, 
    AuthorizationBasicLoggedInComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
