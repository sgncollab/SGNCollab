import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-my-playlist-aartilist',
  templateUrl: './my-playlist-aartilist.page.html',
  styleUrls: ['./my-playlist-aartilist.page.scss'],
})
export class MyPlaylistAartilistPage implements OnInit {

  myList = [];
  lang = false;

  constructor(private dataService: DataService, private navController: NavController) { }

  ngOnInit() {
    this.myList = this.dataService.getmyPlaylistArtilist();
  }
  displayLang() {
    this.lang = !this.lang;
  }

  openAartiDetails(item, index) {
    this.dataService.setLang(this.lang)
    this.dataService.setIndex(index);
    this.dataService.setData(item);
    this.navController.navigateForward(['aarti-details']);
  }
}


