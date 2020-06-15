import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPlaylistAartilistPageRoutingModule } from './my-playlist-aartilist-routing.module';

import { MyPlaylistAartilistPage } from './my-playlist-aartilist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPlaylistAartilistPageRoutingModule
  ],
  declarations: [MyPlaylistAartilistPage]
})
export class MyPlaylistAartilistPageModule {}
