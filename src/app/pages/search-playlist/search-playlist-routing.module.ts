import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPlaylistPage } from './search-playlist.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPlaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPlaylistPageRoutingModule {}
