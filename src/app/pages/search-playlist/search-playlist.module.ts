import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPlaylistPageRoutingModule } from './search-playlist-routing.module';

import { SearchPlaylistPage } from './search-playlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPlaylistPageRoutingModule
  ],
  declarations: [SearchPlaylistPage]
})
export class SearchPlaylistPageModule {}
