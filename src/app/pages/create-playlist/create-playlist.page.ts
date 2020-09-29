import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service'
import { NavController,Platform } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavigationStart } from '@angular/router';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.page.html',
  styleUrls: ['./create-playlist.page.scss'],
})
export class CreatePlaylistPage implements OnInit {
   data= [];
  selectedItems = [];
  checkedbtn = true;
  currentPage = "create-playlist";
  lang = false;
  backButtonSubscription
  
  constructor(
    private dataService: DataService,
    private navController: NavController,
    private platform: Platform
  ) { }

  ngOnInit() {
    //console.log("create playlist");
      fetch('./assets/data/aarti-data.json').then(res => res.json())
        .then(json => {
          this.data = json;

        });
        this.dataService.setPresentPage(this.currentPage);
        this.selectedItems = [];
        }
  // displayLang() {
  //   this.lang = !this.lang;
  //   this.selectedItems = [];
  // }

 
 ionViewWillEnter() {
  this.data.filter(value => value.isChecked=false);
  this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(6666, () => {
     //alert("back button clicked")
      this.navController.navigateForward('aarti-list');
  })
}
ionViewDidLeave() {
 this.backButtonSubscription.unsubscribe();
}


  getItem(e: any, marathiTitle: string) {
    if (e.target.checked) {
      this.selectedItems.push(marathiTitle);
      this.checkedbtn = false;
    }
    else {
      this.selectedItems = this.selectedItems.filter(item => item != marathiTitle);
    }
    if(this.selectedItems.length == 0 ){
      this.checkedbtn = true;
    }
  }
  onNext() {
    //this.dataService.setLang(this.lang);
    this.dataService.setAarti(this.selectedItems);
    this.selectedItems = [];
    //console.log(this.selectedItems);
    this.navController.navigateForward('aarti-reorder');
  }
}
