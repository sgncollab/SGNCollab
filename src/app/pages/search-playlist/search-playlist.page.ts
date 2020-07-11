import { Component, OnInit } from '@angular/core';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search-playlist',
  templateUrl: './search-playlist.page.html',
  styleUrls: ['./search-playlist.page.scss'],
})
export class SearchPlaylistPage implements OnInit {
  searchPlaylist: number;
  playlist = [];
  fetchSearch = [];
  data: any;
  userPlaylist = [];
  playlistString = [];
  fetchAarti = [];
  noItemFound = false;

  constructor(
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
      console.log(this.userPlaylist);
    });
    this.dbService.fetchPlaylist().subscribe((data) => {
      this.playlist = data.map(value => {
        return {
          id: value.payload.doc.id,
          playlist_id: value.payload.doc.data()['playlist_id'],
          playlist_string: value.payload.doc.data()['playlist']
        }
      });
      console.log(this.playlist);
    });

    fetch('./assets/data/aarti-data.json').then(res => res.json())
      .then(json => {
        this.data = json;
      });
  }
  search() {
    this.fetchSearch = [];
    let flag=false;

    //let count = 0;
    for (let i = 0; i < this.playlist.length; i++) {
      if (this.searchPlaylist == this.playlist[i].playlist_id) {
        flag = true;
        var playlistId = this.playlist[i].playlist_id;
        this.playlistString.push(this.playlist[i]);
      }
    }
    if (flag == true) {
      for (let i = 0; i < this.userPlaylist.length; i++) {
        if (playlistId == this.userPlaylist[i].playlist_id) {
          //count++;
          this.fetchSearch.push(this.userPlaylist[i]);
        }
      } //console.log(count);
      //console.log(this.fetchSearch);
    }
    if(this.fetchSearch.length == 0){
      this.noItemFound =true;
    }
    else{
      this.noItemFound =false;
    }
    // if (flag == false){
    //   this.dbService.showToast("Playlist Not Found, Please check code");
    // }
  }

  getString(pId) {
    //console.log(this.playlistString);
    let str = "";
    for (let i = 0; i < this.playlistString.length; i++) {
      str = this.playlistString[i].playlist_string
      //console.log(str)
      this.fetchAarti = [];
      for (let k = 0; k < str.length; k++) {
        let key = str.charAt(k)
        //console.log(key);
        for (let a = 0; a < this.data.length; a++) {
          if (key == this.data[a].aartiId) {
            this.fetchAarti.push(this.data[a])
          }
        }
      }
      //console.log(this.fetchAarti)
      this.dataService.setmyPlaylistArtilist(this.fetchAarti)
      this.navController.navigateForward('search-playlist-aartilist')
    }
  }
}


