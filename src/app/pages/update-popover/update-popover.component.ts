import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update-popover',
  templateUrl: './update-popover.component.html',
  styleUrls: ['./update-popover.component.scss'],
})
export class UpdatePopoverComponent implements OnInit {

  item =[];
  playlistName ="name";
  createdStr = "";
  selectedItems=[];
  aartiId =[];
  userPlaylist =[];
  count = 0;
  srNoList =[];
  itemid = "";
  srNo:any;
  playlistId =0;
  listPlaylist =[];

  constructor( private popovercntrl: PopoverController,
    private dbService: FirebaseDbService,
    private dataService: DataService,
    private navCtrl:NavController
    ) { }

  ngOnInit() {
    this.item = this.dataService.getSelectedPlaylistItem();
    this.playlistName = this.item[0].playlist_name;
    this.itemid = this.item[0].id;   
    this.userPlaylist = this.dataService.getAllUserPlaylist();
    this.listPlaylist = this.dataService.getListPlaylist();
   this.collectdata()
  }

  collectdata(){
    this.srNo = this.item[0].sr_no
    for (let i = 0; i < this.userPlaylist.length; i++) {
      if (this.srNo == this.userPlaylist[i].sr_no && this.itemid != this.userPlaylist[i].id) {
        this.count++;
        this.srNoList.push(this.userPlaylist[i]);
      }
    } 
  }

  onClose(){
    this.popovercntrl.dismiss();
  }

  onDone(){
    let flg = false;
    if(this.playlistName == this.item[0].playlist_name){
      flg = true;
      this.dbService.showToast(" no change in name ");
      this.checkPlaylistdata()
      this.onClose();
    }else {
       for(let j=0;j<this.srNoList.length;j++){
       if(this.playlistName == this.srNoList[j].playlist_name){
        flg = true; 
        this.dbService.showToast("Playlist already created. Please create playlist with different name.");
        break;
      }
     }
    }

    if(flg == false){
        this.checkPlaylistdata()
        this.onClose();
    }  
  }

  checkPlaylistdata(){
    this.createdStr = ""; 
    let flag = false;
    let s = false;
    this.selectedItems = this.dataService.getAarti();
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.aartiId.push(this.selectedItems[i].aartiId); //pushing checked item's ID into aartiId array
      this.createdStr = this.createdStr + this.selectedItems[i].aartiId; //concating array elements ("a,b,c")=>(abc)
    }
    for(let j=0; j<this.listPlaylist.length; j++){
      if(this.createdStr == this.listPlaylist[j].playlist_str){
        flag = true;
        this.playlistId = this.listPlaylist[j].playlist_id
        break;
      }
    }
    if(flag==true){
      for(let k =0; k< this.srNoList.length;k++){
        if( this.playlistId == this.srNoList[k].playlist_id){
          this.dbService.showToast("Playlist already created."+ this.playlistId);
          s= true;
          break;
        }
      } 
    }
    if(flag == false){
      this.dbService.showToast("str not available ");
      this.Insertion()
    }else if(s == false){
      this.updatePlaylist(this.itemid,this.playlistId, this.playlistName,this.srNo);
    }
  }

  updatePlaylist(itemid,playlist_id,playlist_name,srNo){
    this.dbService.showToast("Update list "+this.playlistName);
    this.dbService.updatePlaylist(itemid,playlist_id,playlist_name,srNo);
    this.navCtrl.navigateForward('my-playlist');
  }
  Insertion() {
    if (this.listPlaylist.length > 0 && this.listPlaylist != undefined) {
      let oldPid = 1000, newPid = 0;
      for (var i = 0; i < this.listPlaylist.length; i++) {
        newPid = this.listPlaylist[i].playlist_id;
        if (newPid > oldPid) {
          oldPid = newPid;
        }
        this.playlistId = oldPid + 1;
      }
    }
    else if (this.listPlaylist.length == 0) {
      this.playlistId = 1000;
    }
    this.dbService.insertIntoPlaylist(this.playlistId, this.createdStr);
    this.dbService.updatePlaylist(this.itemid,this.playlistId,this.playlistName,this.srNo);
    this.dbService.showToast("Playlist created successfully");
    this.navCtrl.navigateForward('my-playlist');
  }
 
}
