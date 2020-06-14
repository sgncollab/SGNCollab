import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-aarti-list',
  templateUrl: './aarti-list.page.html',
  styleUrls: ['./aarti-list.page.scss'],
})
export class AartiListPage implements OnInit {
 data: any;

  constructor(
    private navController: NavController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    fetch('./assets/data/aarti-data.json').then(res => res.json())
      .then(json => {
        this.data = json;
      });
  }                                    

  openAartiDetails(item, index) {
    this.dataService.setIndex(index);
    this.dataService.setData(item);
    this.dataService.setmyPlaylistArtilist(this.data);
    this.navController.navigateForward('aarti-details');
  }
}
