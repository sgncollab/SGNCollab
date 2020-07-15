import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPlaylistAartilistPageRoutingModule } from './search-playlist-aartilist-routing.module';

import { SearchPlaylistAartilistPage } from './search-playlist-aartilist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPlaylistAartilistPageRoutingModule
  ],
  declarations: [SearchPlaylistAartilistPage]
})
export class SearchPlaylistAartilistPageModule {}
