import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-update-user-playlist',
  templateUrl: './update-user-playlist.page.html',
  styleUrls: ['./update-user-playlist.page.scss'],
})
export class UpdateUserPlaylistPage implements OnInit {
data=[];
private selectedItems = [];
item=[];
aarti=[];

  constructor(private dataService:DataService,private navCtrl:NavController,private route:ActivatedRoute ) { }

  ngOnInit() {
    fetch('./assets/data/aarti-data.json').then(res => res.json())
    .then(json => {
      this.data = json;
    });
    this.route.queryParams.subscribe(params => {
      this.item = JSON.parse(params["item"]);
      this.aarti = JSON.parse(params["aarti"])
  });
    console.log(this.item)
    console.log(this.aarti)
  }

  getItem(e: any, marathiTitle: string) {
    if (e.target.checked) {
      this.selectedItems.push(marathiTitle);
    }
    else {
      this.selectedItems = this.selectedItems.filter(item => item != marathiTitle);
    }
  }

  onNext() {
    this.dataService.setAarti(this.selectedItems);
    let navigationExtras: NavigationExtras = {
      queryParams: {
          item: JSON.stringify(this.item)
      }
  };
  this.navCtrl.navigateForward(['aarti-reorder'], navigationExtras );
  }

}
