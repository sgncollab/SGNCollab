import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/data.service';
import { FirebaseDbService } from './services/firebase-db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  username: any;
  public appPages = [];
  srNo: any;
  userPlaylist: any = [];
  
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private dataService: DataService,
    private dbService: FirebaseDbService,
    private navController : NavController,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

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
    });
  }
  
 viewMenu(name){
   
   if(name.toLowerCase() == "guest"){
     this.username = name;
    this.appPages = [
      {
        title: 'HomePage',
        url: 'aarti-list',
        icon: 'home'
      },
      {
        title: 'Search Playlist',
        url: 'home',
        icon: 'search'
      },
      {
        title: 'Feedback',
        url: 'home',
        icon: 'create'
      },
      {
        title: 'Settings',
        url: 'home',
        icon: 'settings'
      }
    ];
   } else {
    this.username = name ;
    this.appPages = [
      {
        title: 'HomePage',
        url: 'aarti-list',
        icon: 'home'
      },
      {
        title: 'Create Playlist',
        url: 'create-playlist',
        icon: 'add'
      },
      {
        title: 'My Playlist',
        url: 'my-playlist',
        icon: 'musical-notes'
      },
      {
        title: 'Search Playlist',
        url: 'home',
        icon: 'search'
      },
      {
        title: 'Feedback',
        url: 'home',
        icon: 'create'
      },
      {
        title: 'Settings',
        url: 'home',
        icon: 'settings'
      },
      {
        title: 'Logout',
        url: 'login-register',
        icon: 'exit'
      }
    ];
   }
  
  }
  demo(index) {
    let count = 0 ;
    if(index == 1){
      this.srNo = this.dataService.getLoggedInUserData();
     // console.log(this.srNo);
      for (let i = 0; i < this.userPlaylist.length; i++) {
            if (this.srNo == this.userPlaylist[i].sr_no) {
              count++;
            }
          } console.log(count);
          if(count >= 5){
            
            this.navController.navigateForward('error-page');
            this.dbService.showToast("You have alredy created five playlist");
            //console.log("count is more");
          }
    }
  }
}
