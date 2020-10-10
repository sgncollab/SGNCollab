import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateUserPlaylistPageRoutingModule } from './update-user-playlist-routing.module';

import { UpdateUserPlaylistPage } from './update-user-playlist.page';
import { AartiPreviewPopoverComponent } from '../../aarti-preview-popover/aarti-preview-popover.component';
import { CreatePlaylistPageModule } from '../create-playlist/create-playlist.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateUserPlaylistPageRoutingModule,
    CreatePlaylistPageModule
  ],
  entryComponents:[AartiPreviewPopoverComponent],
  declarations: [UpdateUserPlaylistPage]
})
export class UpdateUserPlaylistPageModule {}
