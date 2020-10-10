import { Component, OnInit } from '@angular/core';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { DataService } from 'src/app/services/data.service';
import { NavController, LoadingController, PopoverController, ActionSheetController,Platform,MenuController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Clipboard } from '@ionic-native/clipboard/ngx';

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
  fetchArti = [];
  currentPage = "my-playlist";
  backButtonSubscription

  constructor(
    private dbService: FirebaseDbService,
    private clipboard: Clipboard, 
    public actionSheetController: ActionSheetController, 
    private popoverController: PopoverController, 
    private loadingController: LoadingController, 
    private dataService: DataService, 
    private navCtrl: NavController,
    private platform: Platform,
    private menu: MenuController
    )
     { }

  // doRefresh(event) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     event.target.complete();
  //   }, 2000);
  // }
  ngOnInit() {
    this.dataService.setPresentPage(this.currentPage);
    this.dbService.fetchUserPlaylist().subscribe((data) => {
      this.result = data.map(value => {
        return {
          id: value.payload.doc.id,
          playlist_id: value.payload.doc.data()['playlist_id'],
          playlist_name: value.payload.doc.data()['playlist_name'],
          sr_no: value.payload.doc.data()['sr_no']
        }
      });
      this.dataService.setAllUserPlaylist(this.result);
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
      this.dataService.setListPlaylist(this.listResult);
      this.playlistDetail();
    });
    fetch('./assets/data/aarti-data.json').then(res => res.json())
      .then(json => {
        this.artiJson = json;
      });
  }
  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(6666, () => {
      this.menu.close();
        this.navCtrl.navigateForward('aarti-list');
    })
  }
  ionViewDidLeave() {
   this.backButtonSubscription.unsubscribe();
  }
  

 
  userDetail() {
    this.srno = this.dataService.getLoggedInUserData();
    this.data = [];
    for (let i = 0; i < this.result.length; i++) {
      if (this.srno == this.result[i].sr_no) {
        this.data.push(this.result[i]);
      }
    }
  }

  playlistDetail() {
    for (let i = 0; i < this.listResult.length; i++) {
      for (let j = 0; j < this.data.length; j++) { // filter method
        if (this.listResult[i].playlist_id == this.data[j].playlist_id) {
          this.listid.push(this.listResult[i]);
        }
      }
    }

    // this.stringCheck()
    //this.data = this.data.filter(item => item.playlist_id == this.listResult[i].playlist_id);
    // var filteredKeywords = this.listResult.filter((word) => this.data.some( word.playlist_id == this.data.playlist_id));
    // console.log(filteredKeywords);
    //console.log(this.data);
  }



  stringCheck(pId) {
    let str = "";

    for (let i = 0; i < this.listid.length; i++) {
      if (pId == this.listid[i].playlist_id) {
        str = this.listid[i].playlist_str;
        this.fetchArti = [];
        for (let k = 0; k < str.length; k++) {
          let key = str.charAt(k)

          for (let a = 0; a < this.artiJson.length; a++) {
            if (key == this.artiJson[a].aartiId) {
              this.fetchArti.push(this.artiJson[a])
            }
          }
        }
        this.dataService.setPlaylistString(str);
        this.dataService.setmyPlaylistArtilist(this.fetchArti);
        this.navCtrl.navigateForward('my-playlist-aartilist');
        break;
      }
    }
  }

  updatePlaylist(item) {
    let selecteditem = [item]
    this.stringCheck(item.playlist_id);
    this.dataService.setSelectedPlaylistItem(selecteditem);
    this.navCtrl.navigateForward('update-user-playlist');
  }
  copyData(item){
    this.clipboard.copy('m-Aarti :-\n'+'My Playlist Code : '+item.playlist_id+'\nPlease use the above code to search my playlist with name : '+item.playlist_name + '\n https://play.google.com/store/apps/details?id=com.sgn.maarti');
   }

  deletePlaylist(item) {
    let count = 0;
    let id = "";
    for (let i = 0; i < this.result.length; i++) {
      if (item.playlist_id == this.result[i].playlist_id) {
        count++;
      }
    }
    for (let j = 0; j < this.listResult.length; j++) {
      if (this.listResult[j].playlist_id == item.playlist_id) {
        id = this.listResult[j].id;
      }
    }
    if (count > 1) {
      this.dbService.deleteUserPlaylist(item.id)
    } else {
      this.dbService.deletePlaylist(id)
      this.dbService.deleteUserPlaylist(item.id)
    }
    this.dbService.showToast(item.playlist_name + " " + " Deleted!")
  }
 

  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [{
        text: 'Delete',
        // role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deletePlaylist(item)
          console.log('Delete clicked');
        }
      }, {
        text: 'Edit',
        icon: 'pencil',
        handler: () => {
          this.updatePlaylist(item)
          //console.log('Edit clicked');
        }
      }, {
        text: 'Share',
        icon: 'share-social-outline',
        handler: () => {
          this.copyData(item)
          this.dbService.showToast("Copied to Clipboard")
         // alert("Copied to Clipboard");
          //console.log('Share clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}

// this.clipboard.clear();