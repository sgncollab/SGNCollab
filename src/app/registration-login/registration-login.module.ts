import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgOtpInputModule } from  'ng-otp-input';

import { RegistrationLoginPageRoutingModule } from './registration-login-routing.module';

import { RegistrationLoginPage } from './registration-login.page';

@NgModule({
  imports: [
    CommonModule,
    //FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistrationLoginPageRoutingModule,
    NgOtpInputModule
  ],
  declarations: [RegistrationLoginPage]
})
export class RegistrationLoginPageModule {}
