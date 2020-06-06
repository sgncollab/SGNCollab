import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AartiReorderPageRoutingModule } from './aarti-reorder-routing.module';

import { AartiReorderPage } from './aarti-reorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AartiReorderPageRoutingModule
  ],
  declarations: [AartiReorderPage]
})
export class AartiReorderPageModule {}
