import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPlaylistAartilistPage } from './my-playlist-aartilist.page';

const routes: Routes = [
  {
    path: '',
    component: MyPlaylistAartilistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPlaylistAartilistPageRoutingModule {}
