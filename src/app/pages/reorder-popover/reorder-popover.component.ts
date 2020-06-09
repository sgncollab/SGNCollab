import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reorder-popover',
  templateUrl: './reorder-popover.component.html',
  styleUrls: ['./reorder-popover.component.scss'],
})
export class ReorderPopoverComponent implements OnInit {
  playlistName: string = "";
  userPlaylist = [];
  srNo: any;
  srNoList = [];
  

  constructor(
    private popovercntrl: PopoverController,
    private dbService: FirebaseDbService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dbService.fetchUserPlaylist().subscribe((data) => {
      this.userPlaylist = data.map(value => {
        return {
          id: value.payload.doc.id,
          playlist_id: value.payload.doc.data()['playlist_id'],
          playlist_name: value.payload.doc.data()['playlist_name'],
          sr_no: value.payload.doc.data()['sr_no']
        }
      });
      console.log(this.userPlaylist);

    });
    this.srNo = this.dataService.getLoggedInUserData();
  }

  onDone() {
    //console.log(this.srNo);
    //console.log(this.playlistName);
    let flag = false;
    let count=0;

    for (let i = 0; i < this.userPlaylist.length; i++) {
      if (this.srNo == this.userPlaylist[i].sr_no) {
        count++;
        this.srNoList.push(this.userPlaylist[i]);
      }
    }
    if (count >= 1) {
      for (let i = 0; i < this.srNoList.length; i++) {
        if (this.playlistName == this.srNoList[i].playlist_name) {
          flag = true;
          console.log("Playlist already created. Please create playlist with different name.");
          break;
        }

      }
    }
    if (flag == false) {
      console.log("Playlist name accepted");
      this.popovercntrl.dismiss();
      
    }
  }










    // let count = 0;
    // for (let i = 0; i < this.userPlaylist.length; i++) {
    //   if (this.srNo == this.userPlaylist[i].sr_no) {
    //     count++;
    //     this.srNoList.push(this.userPlaylist[i]);
    //     console.log(this.srNoList);
    //     break;
    //   }
    // }
    // if (count > 0) {
    //   for (let i = 0; i <= this.srNoList.length; i++) {
    //     if (this.playlistName == this.srNoList[i].playlist_name) {
    //       console.log("Playlist already created. Please create playlist with different name.");
    //       break;
    //     }
    //   }

    // }






















    // for (let i = 0; i < this.userPlaylist.length; i++) {
    //   if (this.srNo == this.userPlaylist[i].sr_no) {
    //     //console.log("check for playlist name");
    //     let flag = false;
    //     for(let i = 0; i < this.userPlaylist.length; i++){
    //       if (this.playlistName == this.userPlaylist[i].playlist_name) {
    //         flag=true;
    //         console.log("Playlist already created. Please create playlist with different name.");
    //         break;
    //       } 
    //     }
    //     if(flag == false){
    //       console.log("done");
    //       this.popovercntrl.dismiss();
    //       break;
    //     }
    //   }
    // }
  

  onClose() {
    this.popovercntrl.dismiss();
  }

}
