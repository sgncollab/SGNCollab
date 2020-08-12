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
  srNo:any;
  userPlaylist: any = [];
  dataPage = "aarti-list";
  currentPage = "app-component"


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private dataService: DataService,
    private dbService: FirebaseDbService,
    private navController: NavController,
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
      if(this.srNo != ""){
        
      }
    });
    
    
    
  }
  
 viewMenu(name){
   if(name.toLowerCase() == "guest"){
    this.username = "Guest";
    this.appPages = [
      {
        title: 'All Aarti List',
        url: 'aarti-list',
        icon: 'list'
        
      },
      {
        title: 'Search Playlist',
        url: 'search-playlist',
        icon: 'search'
      },
      {
        title: 'Feedback',
        url: 'feedback',
        icon: 'create'
      },
      {
        title: 'Settings',
        url: 'settings',
        icon: 'settings'
      },
      {
        title: 'About us',
        url: 'about-us',
        icon: 'information-circle'
      },
      {
        title: 'Register',
        url: 'login-register',
        icon: 'enter'
      }
    ];
   } else {
    this.username = name ;
    this.appPages = [
      {
        title: 'Homepage',
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
        url: 'search-playlist',
        icon: 'search'
      },
      {
        title: 'Feedback',
        url: 'feedback',
        icon: 'create'
      },
      {
        title: 'Settings',
        url: 'settings',
        icon: 'settings'
      },
      {
        title: 'About us',
        url: 'about-us',
        icon: 'information-circle'
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
    this.dataPage = this.dataService.getPresentPage();
    //console.log(this.dataPage);
    if(this.username.toLowerCase() != "guest"){
      if (index == 7) {
        this.logout();
      }
      let count = 0;
      if (index == 1) {
        this.srNo = this.dataService.getLoggedInUserData();
        for (let i = 0; i < this.userPlaylist.length; i++) {
          if (this.srNo == this.userPlaylist[i].sr_no) {
            count++;
          }
        } 
        if (count >= 5) {
          this.navController.navigateForward(this.dataPage);
          this.dbService.showToast("You have already created five playlist.");
        }
      }
      if (index == 2) {
        this.srNo = this.dataService.getLoggedInUserData();
        for (let i = 0; i < this.userPlaylist.length; i++) {
          if (this.srNo == this.userPlaylist[i].sr_no) {
            count++;
          }
        } 
        if (count < 1) {
          this.navController.navigateForward(this.dataPage);
          this.dbService.showToast("Please create a playlist!");
        }
      }
    }
  }

  logout() {
    console.log("logout");
    localStorage.clear();
  }
}
