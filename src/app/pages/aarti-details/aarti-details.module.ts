import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AartiDetailsPageRoutingModule } from './aarti-details-routing.module';

import { AartiDetailsPage } from './aarti-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AartiDetailsPageRoutingModule
  ],
  declarations: [AartiDetailsPage]
})
export class AartiDetailsPageModule {}
