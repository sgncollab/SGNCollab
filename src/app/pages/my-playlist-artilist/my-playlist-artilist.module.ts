import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPlaylistArtilistPageRoutingModule } from './my-playlist-artilist-routing.module';

import { MyPlaylistArtilistPage } from './my-playlist-artilist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPlaylistArtilistPageRoutingModule
  ],
  declarations: [MyPlaylistArtilistPage]
})
export class MyPlaylistArtilistPageModule {}
