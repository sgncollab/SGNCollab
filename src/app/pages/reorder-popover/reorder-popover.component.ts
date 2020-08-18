import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
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
  playlist = [];
  selectedItems = [];
  aartiId = [];
  srCheck = [];
  playlistId = 1000;
  playlistString = "";
  pId:number;
  

  constructor(
    private popovercntrl: PopoverController,
    private dbService: FirebaseDbService,
    private dataService: DataService,
    private navController: NavController
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
    //console.log(this.userPlaylist);
    });
    this.dbService.fetchPlaylist().subscribe((data) => {
      this.playlist = data.map(value => {
        return {
          id: value.payload.doc.id,
          playlist_id: value.payload.doc.data()['playlist_id'],
          playlist_name: value.payload.doc.data()['playlist']
        }
      });
      //console.log(this.playlist);
    });
    this.srNo = this.dataService.getLoggedInUserData();
    //console.log(this.srNo);
  }
  onCreate() {
    let flag = false;
    let count = 0;
    if(this.playlistName != null && this.playlistName != ""){
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
              this.dbService.showToast("Playlist already created. Please create playlist with different name.");
              break;
            }
          }
      }
      if (flag == false) {
        console.log("Playlist name accepted!");
        this.dataService.setPlaylistName(this.playlistName);
        this.onClose();
        this.createPlaylist();
      }
    }
    else{
      this.dbService.showToast("Please Enter Playlist Name");

    }
    
  }
  onClose() {
    this.popovercntrl.dismiss();
  }

  createPlaylist() {
    this.playlistName = this.dataService.getPlaylistName();
    let flag = false;
    let flag1 = false;
    let count = 0;
    this.playlistString = ""; 

    this.selectedItems = this.dataService.getAarti();
    console.log(this.selectedItems); //checked items

    for (let i = 0; i < this.selectedItems.length; i++) {
      this.aartiId.push(this.selectedItems[i].aartiId); //pushing checked item's ID into aartiId array
      this.playlistString = this.playlistString + this.selectedItems[i].aartiId; //concating array elements ("a,b,c")=>(abc)
    }
    console.log(this.playlistString);

    for (let i = 0; i < this.playlist.length; i++) {
      if (this.playlistString == this.playlist[i].playlist_name) {
        flag =true;
        //console.log(this.playlist[i]);
        console.log("check if it is created by same user or not?");
        //this.playlistStringCheck();
         this.pId = this.playlist[i].playlist_id
        console.log(this.pId);

        // this.srCheck = this.userPlaylist.filter(srno => this.srNo == this.userPlaylist.sr_no);
        // console.log(this.srCheck);
        

        for (let i = 0; i < this.userPlaylist.length; i++) {
          if (this.srNo == this.userPlaylist[i].sr_no) {
            count++;
            this.srCheck.push(this.userPlaylist[i]);
          }
        } console.log(count);
        //console.log(this.srCheck);

        if (count >= 1) {
          for (let i = 0; i < this.srCheck.length; i++) {
            if (this.pId == this.srCheck[i].playlist_id) {
              flag1 = true;
              this.dbService.showToast("You have already created same playlist,with name " + this.srCheck[i].playlist_name);
            }
          }
          
        }
        if(flag1 == false) {
          console.log("playlist is present,but not created by the same user(logged in)");
          this.secondInsertion();
        }
      }
    }
    if (flag == false) {
      console.log("first time insertion");
      this.firstInsertion();
    }
  }
  firstInsertion() {
    if (this.playlist.length > 0 && this.playlist != undefined) {
      let oldPid = 1000, newPid = 0;
      for (var i = 0; i < this.playlist.length; i++) {
        newPid = this.playlist[i].playlist_id;
        if (newPid > oldPid) {
          oldPid = newPid;
        }
        this.playlistId = oldPid + 1;
      }
    }
    else if (this.playlist.length == 0) {
      this.playlistId = 1000;
    }
    this.dbService.insertIntoPlaylist(this.playlistId, this.playlistString);
    this.dbService.insertIntoUserPlaylist(this.playlistId, this.playlistName, this.srNo);
    //console.log("Inserted into both table successfully");
    this.dbService.showToast("Playlist created successfully");
    this.navController.navigateForward('my-playlist');
  }
  secondInsertion() {
    //console.log("no auto gen.take playlist id ,insert same id,with playlist name & srno into userplaylist");
    // console.log(this.pId);
    // console.log(this.playlistName);
    // console.log(this.srNo);
    this.dbService.insertIntoUserPlaylist(this.pId, this.playlistName, this.srNo);
    //console.log("Inserted into user playlist successfully");
    this.dbService.showToast("Playlist created successfully");
    this.navController.navigateForward('my-playlist');
  }














}
