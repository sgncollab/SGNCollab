import { Component, OnInit } from '@angular/core';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { DataService } from 'src/app/services/data.service';
import { NavController,Platform ,MenuController} from '@ionic/angular';

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
  currentPage = "search-playlist";
  backButtonSubscription

  constructor(
    private dbService: FirebaseDbService,
    private dataService: DataService,
    private navController: NavController,
    private platform: Platform,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.dataService.setPresentPage(this.currentPage);
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
          playlist_string: value.payload.doc.data()['playlist']
        }
      });
     // console.log(this.playlist);
    });

    fetch('./assets/data/aarti-data.json').then(res => res.json())
      .then(json => {
        this.data = json;
      });
  }
  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(6666, () => {
        this.menu.close();
        this.navController.navigateForward('aarti-list');
    })
  }
  ionViewDidLeave() {
   this.backButtonSubscription.unsubscribe();
  }
  search(e) {
    //console.log(e.detail.value);
    this.fetchSearch = [];
    let flag=false;
    for (let i = 0; i < this.playlist.length; i++) {
      if (e.detail.value == this.playlist[i].playlist_id) {
        flag = true;
        var playlistId = this.playlist[i].playlist_id;
        this.playlistString.push(this.playlist[i]);
      }
    }
    if (flag == true) {
      for (let i = 0; i < this.userPlaylist.length; i++) {
        if (playlistId == this.userPlaylist[i].playlist_id) {
          this.fetchSearch.push(this.userPlaylist[i]);
        }
      } 
    }
    if(this.fetchSearch.length == 0){
      this.noItemFound =true;
    }
    else{
      this.noItemFound =false;
    }
    if(this.searchPlaylist.toString() == ""){
      this.noItemFound = false;
    }
  }

  getString(pId) {
    let str = "";
    for (let i = 0; i < this.playlistString.length; i++) {
      str = this.playlistString[i].playlist_string
      this.fetchAarti = [];
      for (let k = 0; k < str.length; k++) {
        let key = str.charAt(k)
        for (let a = 0; a < this.data.length; a++) {
          if (key == this.data[a].aartiId) {
            this.fetchAarti.push(this.data[a])
          }
        }
      }
      this.dataService.setmyPlaylistArtilist(this.fetchAarti)
      this.navController.navigateForward('my-playlist-aartilist')
    }
  }
}


