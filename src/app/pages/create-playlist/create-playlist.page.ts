import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service'
import { NavController, Platform ,MenuController, PopoverController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavigationStart } from '@angular/router';
import { AartiPreviewPopoverComponent } from '../../aarti-preview-popover/aarti-preview-popover.component'

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.page.html',
  styleUrls: ['./create-playlist.page.scss'],
})
export class CreatePlaylistPage implements OnInit {
  data = [];
  selectedItems = [];
  checkedbtn = true;
  currentPage = "create-playlist";
  lang = false;
  backButtonSubscription

  constructor(
    private dataService: DataService,
    private navController: NavController,
    private platform: Platform,
    private menu: MenuController,
    private popovercntrl: PopoverController
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
  


  ionViewWillEnter() {
    this.data.filter(value => value.isChecked = false);
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(6666, () => {
      this.menu.close();
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
    if (this.selectedItems.length == 0) {
      this.checkedbtn = true;
    }
  }
  async presentPopover(ev ,item) {
    //console.log(item);
    this.dataService.setItem(item);
    const popover = await this.popovercntrl.create({
      component: AartiPreviewPopoverComponent,
      cssClass: 'ion-popover-1',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  onNext() {
    //this.dataService.setLang(this.lang);
    this.dataService.setAarti(this.selectedItems);
    this.selectedItems = [];
    //console.log(this.selectedItems);
    this.navController.navigateForward('aarti-reorder');
  }
}

// displayLang() {
  //   this.lang = !this.lang;
  //   this.selectedItems = [];
  // }