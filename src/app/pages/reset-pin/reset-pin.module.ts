import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from  'ng-otp-input';

import { IonicModule } from '@ionic/angular';

import { ResetPinPageRoutingModule } from './reset-pin-routing.module';

import { ResetPinPage } from './reset-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPinPageRoutingModule,
    NgOtpInputModule
  ],
  declarations: [ResetPinPage]
})
export class ResetPinPageModule {}
