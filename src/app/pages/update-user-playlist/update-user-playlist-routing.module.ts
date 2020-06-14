import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateUserPlaylistPage } from './update-user-playlist.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateUserPlaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateUserPlaylistPageRoutingModule {}
