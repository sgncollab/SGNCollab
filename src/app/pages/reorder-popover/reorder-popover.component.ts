import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';

@Component({
  selector: 'app-reorder-popover',
  templateUrl: './reorder-popover.component.html',
  styleUrls: ['./reorder-popover.component.scss'],
})
export class ReorderPopoverComponent implements OnInit {
  playlistName: string = "";
  userPlaylist = [];

  constructor(
    private popovercntrl: PopoverController,
    private dbService: FirebaseDbService
  ) { }

  ngOnInit() {
    // this.dbService.fetchUserPlaylist().subscribe((data) => {
    //   this.userPlaylist = data.map(value => {
    //     return {
    //       id: value.payload.doc.id,
    //       playlist_id: value.payload.doc.data()['playlist_id'],
    //       playlist_name: value.payload.doc.data()['playlist_name'],
    //       sr_no: value.payload.doc.data()['sr_no']
    //     }
    //   });
    // });
    // console.log(this.userPlaylist);
  }

  onDone() {
    console.log(this.playlistName);
  }

  onClose() {
    this.popovercntrl.dismiss();
  }

}
