import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthorizationBasicLoggedInComponent } from './authorization-basic-logged-in.component';
import { MatTableModule } from '@angular/material/table' 
@NgModule({
  imports: [CommonModule, MatTableModule],
  declarations: [AuthorizationBasicLoggedInComponent],
  providers: [],
  exports: [AuthorizationBasicLoggedInComponent]
})
export class AuthorizationBasicLoggedInComponentModule {
}
