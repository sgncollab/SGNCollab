import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPlaylistPage } from './my-playlist.page';

const routes: Routes = [
  {
    path: '',
    component: MyPlaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPlaylistPageRoutingModule {}
