import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePlaylistPageRoutingModule } from './create-playlist-routing.module';

import { CreatePlaylistPage } from './create-playlist.page';
import { AartiPreviewPopoverComponent } from '../../aarti-preview-popover/aarti-preview-popover.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePlaylistPageRoutingModule
  ],
  entryComponents:[AartiPreviewPopoverComponent],
  declarations: [CreatePlaylistPage,AartiPreviewPopoverComponent],
  exports:[AartiPreviewPopoverComponent]

})
export class CreatePlaylistPageModule {}
