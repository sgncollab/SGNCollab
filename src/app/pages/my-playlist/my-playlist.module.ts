import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPlaylistPageRoutingModule } from './my-playlist-routing.module';

import { MyPlaylistPage } from './my-playlist.page';
import { PopoverOptionsComponent } from '../popover-options/popover-options.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPlaylistPageRoutingModule
  ],
  
  entryComponents:[PopoverOptionsComponent],
  declarations: [MyPlaylistPage,PopoverOptionsComponent]
})
export class MyPlaylistPageModule {}
