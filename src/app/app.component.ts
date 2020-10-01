import { Component, OnInit } from '@angular/core';
import { Platform, NavController,AlertController,PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/data.service';
import { FirebaseDbService } from './services/firebase-db.service';
import { Network } from '@ionic-native/network/ngx';
// import { Events } from '@ionic/angular';



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
  net=true;
  backButtonSubscription
  userType;

 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private dataService: DataService,
    private dbService: FirebaseDbService,
    private navController: NavController,
    private statusBar: StatusBar,
    private network: Network,
    public alertController: AlertController,
    private popovercntrl: PopoverController
  ) {
    this.initializeApp();
    
    this.network.onDisconnect().subscribe(() => {
      this.net= false;
      this.userType = this.dataService.getUserType();
     this.viewMenu(this.userType)
      if(this.currentPage !="RegisterationLogin "){
        this.navController.navigateForward('aarti-list');
      } 
  // alert('network was disconnected :-('+ this.network.type);
});
  this.network.onConnect().subscribe(() => {
  // alert('network connected!');
  this.net= true;

  this.userType = this.dataService.getUserType();
     this.viewMenu(this.userType)
  setTimeout(() => {
    if (this.network.type === 'wifi') {
      // alert('we got a wifi connection, woohoo!');
    }
  }, 3000);
});
  }
  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(6666, () => {
      //alert("back button clicked")
      this.navController.navigateForward('aarti-list');
    })
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.hide();
      this.splashScreen.hide();
         
    });
  }
  
 

  ngOnInit() {
    // this.network.onDisconnect().subscribe(() => {
    //   alert('network was disconnected :-(');
    // });
    // this.network.onConnect().subscribe(() => {
    //   alert('network connected!');
    //   setTimeout(() => {
    //     if (this.network.type === 'wifi') {
    //       alert('we got a wifi connection, woohoo!');
    //     }
    //   }, 3000);
    // });

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

  // viewMenu(name){
  //   if(name.toLowerCase() == "guest"){
  //     this.username = "Guest";
  //     this.appPages = [
  //       {
  //         title: 'All Aarti List',
  //         url: 'aarti-list',
  //         icon: 'list'
          
  //       },
  //       {
  //         title: 'Search Playlist',
  //         url: 'search-playlist',
  //         icon: 'search'
  //       },
  //       {
  //         title: 'Feedback',
  //         url: 'feedback',
  //         icon: 'create'
  //       },
      
  //       {
  //         title: 'Register',
  //         url: 'registration-login',
  //         icon: 'enter'
  //       }
  //     ];
  //    } else { 
  //     this.username = name;
  //     this.appPages = [
  //       {
  //         title: 'Homepage',
  //         url: 'aarti-list',
  //         icon: 'home'
  //       },
  //       {
  //         title: 'Create Playlist',
  //         url: 'create-playlist',
  //         icon: 'add'
  //       },
  //       {
  //         title: 'My Playlist',
  //         url: 'my-playlist',
  //         icon: 'musical-notes'
  //       },
  //       {
  //         title: 'Search Playlist',
  //         url: 'search-playlist',
  //         icon: 'search'
  //       },
  //       {
  //         title: 'Feedback',
  //         url: 'feedback',
  //         icon: 'create'
  //       },
       
  //       {
  //         title: 'Logout',
  //         url: 'registration-login',
  //         icon: 'exit'
  //       }
  //     ];
  //    }
     
  //   }
   
//   netCheck(){
// this.net = false;
//   }
 viewMenu(name){
  if(name.toLowerCase() == "guest" && this.net==true){
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
   } else if(name!= "guest" && this.net== false) {
    
    this.username = name;
    this.appPages = [
      {
        title: 'Homepage',
        url: 'aarti-list',
        icon: 'home'
      },
     
      {
        title: 'Logout',
        url: 'registration-login',
        icon: 'exit'
      }
    ];
   }else if(name =="guest" && this.net== false) {
    
    this.username = "Guest";
    this.appPages = [
      {
        title: 'Homepage',
        url: 'aarti-list',
        icon: 'home'
      }
    ];
   }else if(name!= "guest"  && this.net == true){ 
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
      if(index == 3 || index == 2){
        this.dataService.setGuest(this.user);
      }
      // if(index == 1){
      //   this.presentPopover();
      // }
    }
  }

  logout() {
    // this.user_name= "";
    console.log("logout");
    localStorage.clear();
  }
}
//   async presentPopover() {
//     const popover = await this.popovercntrl.create({
//       component: ForgotPinPopoverComponent,
//       cssClass: 'ion-popover-1',
//       translucent: true
//     });
//     return await popover.present();
//   }
// }

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