import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPlaylistArtiDetailPage } from './my-playlist-arti-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MyPlaylistArtiDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPlaylistArtiDetailPageRoutingModule {}
