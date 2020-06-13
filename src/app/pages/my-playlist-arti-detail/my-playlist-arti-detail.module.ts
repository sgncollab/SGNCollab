import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPlaylistArtiDetailPageRoutingModule } from './my-playlist-arti-detail-routing.module';

import { MyPlaylistArtiDetailPage } from './my-playlist-arti-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPlaylistArtiDetailPageRoutingModule
  ],
  declarations: [MyPlaylistArtiDetailPage]
})
export class MyPlaylistArtiDetailPageModule {}
