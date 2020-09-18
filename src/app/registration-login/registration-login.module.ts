import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgOtpInputModule } from  'ng-otp-input';
import { RegistrationLoginPageRoutingModule } from './registration-login-routing.module';
import { RegistrationLoginPage } from './registration-login.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {ForgotPinPopoverComponent} from '../forgot-pin-popover/forgot-pin-popover.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistrationLoginPageRoutingModule,
    NgOtpInputModule,
    
  ],
  entryComponents:[ForgotPinPopoverComponent],
  declarations: [RegistrationLoginPage,ForgotPinPopoverComponent],
  providers:[ScreenOrientation]
})
export class RegistrationLoginPageModule {}
