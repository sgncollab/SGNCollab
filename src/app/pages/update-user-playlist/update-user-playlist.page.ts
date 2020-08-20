import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-update-user-playlist',
  templateUrl: './update-user-playlist.page.html',
  styleUrls: ['./update-user-playlist.page.scss'],
})
export class UpdateUserPlaylistPage implements OnInit {
data=[]; 
item=[];
aarti=[];
playlistStr = "";
currentPage = "update-user-playlist";

  constructor(private dataService:DataService,private navCtrl:NavController ) { }

  ngOnInit() {
    this.dataService.setPresentPage(this.currentPage);
    fetch('./assets/data/aarti-data.json').then(res => res.json())
    .then(json => {
      this.data = json;
      this.datacheck()
    });  
  this.item = this.dataService.getSelectedPlaylistItem();
 this.playlistStr = this.dataService.getPlaylistString();
  }
datacheck(){
  for (let k = 0; k < this.playlistStr.length; k++) {
    let key = this.playlistStr.charAt(k)
   for(let i = 0; i < this.data.length; i++){
      if(key == this.data[i].aartiId){
        this.data[i].isChecked = true;
      }
  }
   }
}
  
  onNext() {
  let selectedItems = [];
  for(let j=0;j < this.data.length ; j++){
    if(this.data[j].isChecked == true){
      selectedItems.push(this.data[j]);
    }else{
           selectedItems = selectedItems.filter(item => item != this.data[j]);
        }
  }
    this.dataService.setAarti(selectedItems);
    this.navCtrl.navigateForward('aarti-reorder');
  }

}
