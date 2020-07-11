import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AartiReorderPageRoutingModule } from './aarti-reorder-routing.module';

import { AartiReorderPage } from './aarti-reorder.page';
import { ReorderPopoverComponent } from '../reorder-popover/reorder-popover.component';
import { UpdatePopoverComponent } from '../update-popover/update-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AartiReorderPageRoutingModule,
  ],
  entryComponents:[ReorderPopoverComponent,UpdatePopoverComponent],
  declarations: [AartiReorderPage , ReorderPopoverComponent, UpdatePopoverComponent]
})
export class AartiReorderPageModule {}
