import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPlaylistArtilistPage } from './my-playlist-artilist.page';

const routes: Routes = [
  {
    path: '',
    component: MyPlaylistArtilistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPlaylistArtilistPageRoutingModule {}
