import { Component, OnInit } from '@angular/core';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { DataService } from 'src/app/services/data.service';
import { NavController, LoadingController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.page.html',
  styleUrls: ['./my-playlist.page.scss'],
})
export class MyPlaylistPage implements OnInit {
  result = [];
  listResult = [];
  data = [];
  srno: any;
  listid = [];
  artiJson = [];
  fetchArti=[];

  constructor(private dbService: FirebaseDbService,private loadingController:LoadingController, private dataService: DataService, private navCtrl: NavController) { }

  ngOnInit() {
   // this.loadPlaylist();
    this.dbService.fetchUserPlaylist().subscribe((data) => {
      this.result = data.map(value => {
        return {
          id: value.payload.doc.id,
          playlist_id: value.payload.doc.data()['playlist_id'],
          playlist_name: value.payload.doc.data()['playlist_name'],
          sr_no: value.payload.doc.data()['sr_no']
        }
      });
      this.userDetail();
    });

    this.dbService.fetchPlaylist().subscribe((data) => {
      this.listResult = data.map(value => {
        return {
          id: value.payload.doc.id,
          playlist_id: value.payload.doc.data()['playlist_id'],
          playlist_str: value.payload.doc.data()['playlist']
        }
      });
      this.playlistDetail();
    });
    fetch('./assets/data/aarti-data.json').then(res => res.json())
      .then(json => {
        this.artiJson = json;
      });
  }


  userDetail() {
    this.srno = this.dataService.getLoggedInUserData();
    this.data =[];
    for (let i = 0; i < this.result.length; i++) {
      if (this.srno == this.result[i].sr_no) {
        this.data.push(this.result[i]);
      }
    }
    console.log(this.data);
  }

  playlistDetail() {
    for (let i = 0; i < this.listResult.length; i++) {
      for (let j = 0; j < this.data.length; j++) { // filter method
        if (this.listResult[i].playlist_id == this.data[j].playlist_id) {
          this.listid.push(this.listResult[i]);
        }
      }
    }
    //   console.log(this.listid);
    // this.stringCheck()
    //this.data = this.data.filter(item => item.playlist_id == this.listResult[i].playlist_id);
    // var filteredKeywords = this.listResult.filter((word) => this.data.some( word.playlist_id == this.data.playlist_id));
    // console.log(filteredKeywords);
    //console.log(this.data);
  }



  stringCheck(pId) {
    let str = "";
    console.log(this.listid);
    for (let i = 0; i < this.listid.length; i++) {
      if (pId == this.listid[i].playlist_id) {
        str = this.listid[i].playlist_str;
        console.log(str)
         this.fetchArti = [];
        for (let k = 0; k < str.length; k++) {
          let key = str.charAt(k)
          console.log(key);
          for (let a = 0; a < this.artiJson.length; a++) {
            if (key == this.artiJson[a].aartiId) {
              this.fetchArti.push(this.artiJson[a])
            }
          }
        }
        console.log(this.fetchArti);
        this.dataService.setmyPlaylistArtilist(this.fetchArti);
        this.navCtrl.navigateForward('my-playlist-aartilist');
        break;
      }
    }
  }

updatePlaylist(item){
this.stringCheck(item.playlist_id);
  let navigationExtras: NavigationExtras = {
    queryParams: {
        item: JSON.stringify(item),
        aarti: JSON.stringify(this.fetchArti)

    }
};
this.navCtrl.navigateForward(['update-user-playlist'], navigationExtras );
}

  deletePlaylist(item) {
    let count = 0;
    let id ="";
    for (let i=0 ;i<this.result.length;i++){
      if(item.playlist_id == this.result[i].playlist_id){
        count++;
      }
    }
    for(let j=0;j< this.listResult.length;j++){
      if(this.listResult[j].playlist_id == item.playlist_id){
        id = this.listResult[j].id;
      }
    }
    if(count > 1){
      this.dbService.deleteUserPlaylist(item.id)
    }else {
      this.dbService.deletePlaylist(id)
      this.dbService.deleteUserPlaylist(item.id)
    }
    this.dbService.showToast(item.playlist_name + " "+" Deleted!")
  }

}
