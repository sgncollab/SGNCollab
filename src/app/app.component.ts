import { Component, OnInit } from '@angular/core';
import { Platform, NavController,AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/data.service';
import { FirebaseDbService } from './services/firebase-db.service';
import { Network } from '@ionic-native/network/ngx';

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
  dataPage = "";
  currentPage = "app-component";
  user = "guest";
  user_name;

 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private dataService: DataService,
    private dbService: FirebaseDbService,
    private navController: NavController,
    private statusBar: StatusBar,
    private network: Network,
    public alertController: AlertController,
    
  ) {
    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ionViewWillEnter(){

  }
 

  ngOnInit() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      alert('network was disconnected :-(');
    });
    
    // stop disconnect watch
    // disconnectSubscription.unsubscribe();
    
    
    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      alert('network connected!');
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          alert('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

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
        title: 'Register',
        url: 'registration-login',
        icon: 'enter'
      }
    ];
   } else {
    this.username = name;
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
        title: 'Logout',
        url: 'registration-login',
        icon: 'exit'
      }
    ];
   
  
   }
  //  window.addEventListener('offline', () => {
  //   //Do task when no internet connection
  //   this.dbService.showToast("Kindly check your internet Connection!");
  //   });
  //   window.addEventListener('online', () => {
  //     //Do task when internet connection returns
     
  //     });
   
  }
 
  sideMenuClick(index) {
    //console.log(this.dataPage);
    this.dataPage = this.dataService.getPresentPage();
    //console.log(this.dataPage);
    if(this.username.toLowerCase() != "guest"){
      if (index == 5) {
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
    else if(this.username.toLowerCase() == "guest"){
      // console.log("Guest")
      if(index == 3){
        this.dataService.setGuest(this.user);
      }
    }
  }

  logout() {
    this.user_name= "";
    console.log("logout");
    localStorage.clear();
  }
}

// {
//   title: 'Settings',
//   url: 'settings',
//   icon: 'settings'
// },
// {
//   title: 'About us',
//   url: 'about-us',
//   icon: 'information-circle'
// },