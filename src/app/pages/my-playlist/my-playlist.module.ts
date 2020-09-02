import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPlaylistPageRoutingModule } from './my-playlist-routing.module';

import { MyPlaylistPage } from './my-playlist.page';
import { Clipboard } from '@ionic-native/clipboard/ngx';
//import { PopoverOptionsComponent } from '../popover-options/popover-options.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPlaylistPageRoutingModule
  ],
  
  //entryComponents:[PopoverOptionsComponent],
  declarations: [MyPlaylistPage],
  providers:[Clipboard]
})
export class MyPlaylistPageModule {}
