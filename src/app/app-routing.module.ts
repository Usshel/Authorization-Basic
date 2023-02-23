import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorizationBasicComponent } from './components/authorization-basic/authorization-basic.component';
import { AuthorizationBasicLoggedInComponent } from './components/authorization-basic-logged-in/authorization-basic-logged-in.component';
import { AuthorizationBasicComponentModule } from './components/authorization-basic/authorization-basic.component-module';
import { AuthorizationBasicLoggedInComponentModule } from './components/authorization-basic-logged-in/authorization-basic-logged-in.component-module';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'auto-login/login', component: AuthorizationBasicComponent }, 
    { path: 'auto-login/logged-in', component: AuthorizationBasicLoggedInComponent }]), 
    
    AuthorizationBasicComponentModule, 
    AuthorizationBasicLoggedInComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
