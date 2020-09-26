import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AartiListPageRoutingModule } from './aarti-list-routing.module';

import { AartiListPage } from './aarti-list.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AartiListPageRoutingModule
  ],
  declarations: [AartiListPage]
})
export class AartiListPageModule {}
