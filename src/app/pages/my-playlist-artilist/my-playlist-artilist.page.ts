import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-my-playlist-artilist',
  templateUrl: './my-playlist-artilist.page.html',
  styleUrls: ['./my-playlist-artilist.page.scss'],
})
export class MyPlaylistArtilistPage implements OnInit {

  myList = [];

  constructor(private dataService: DataService, private navController: NavController) { }

  ngOnInit() {
    this.myList = this.dataService.getmyPlaylistArtilist();
  }

  openAartiDetails(item, index) {
    this.dataService.setIndex(index);
    this.dataService.setData(item);
    this.navController.navigateForward(['aarti-details']);
  }
}


