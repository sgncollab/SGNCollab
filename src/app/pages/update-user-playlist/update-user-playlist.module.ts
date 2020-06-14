import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateUserPlaylistPageRoutingModule } from './update-user-playlist-routing.module';

import { UpdateUserPlaylistPage } from './update-user-playlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateUserPlaylistPageRoutingModule
  ],
  declarations: [UpdateUserPlaylistPage]
})
export class UpdateUserPlaylistPageModule {}
