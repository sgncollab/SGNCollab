import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPlaylistPageRoutingModule } from './my-playlist-routing.module';

import { MyPlaylistPage } from './my-playlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPlaylistPageRoutingModule
  ],
  declarations: [MyPlaylistPage]
})
export class MyPlaylistPageModule {}
