import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  username:any;
  public appPages = [ ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
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
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    } 
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
        url: '',
        icon: 'paper-plane'
      },
      {
        title: 'Feedback',
        url: '',
        icon: 'star'
      },
      {
        title: 'Settings',
        url: '',
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
        url: '',
        icon: 'archive'
      },
      {
        title: 'Feedback',
        url: '',
        icon: 'star'
      },
      {
        title: 'Settings',
        url: '',
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

}
