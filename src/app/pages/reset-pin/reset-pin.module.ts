import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPinPageRoutingModule } from './reset-pin-routing.module';

import { ResetPinPage } from './reset-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPinPageRoutingModule
  ],
  declarations: [ResetPinPage]
})
export class ResetPinPageModule {}
