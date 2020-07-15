import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPlaylistAartilistPage } from './search-playlist-aartilist.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPlaylistAartilistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPlaylistAartilistPageRoutingModule {}
