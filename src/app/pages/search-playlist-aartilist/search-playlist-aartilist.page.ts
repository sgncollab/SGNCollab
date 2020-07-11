import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search-playlist-aartilist',
  templateUrl: './search-playlist-aartilist.page.html',
  styleUrls: ['./search-playlist-aartilist.page.scss'],
})
export class SearchPlaylistAartilistPage implements OnInit {
  playlistString =[];
  aartiDetails = [];
  temp =[];
  
  constructor(private dataService: DataService,private navController: NavController) { }

  ngOnInit() {
    this.aartiDetails = this.dataService.getmyPlaylistArtilist();
   }
   openAartiDetails(item, index) {
    this.dataService.setIndex(index);
    this.dataService.setData(item);
    this.navController.navigateForward(['aarti-details']);
  }
  }

  
  







