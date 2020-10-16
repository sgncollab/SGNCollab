import { Component, OnInit } from '@angular/core';
import { NavController, Platform ,MenuController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  backButtonSubscription

  constructor(
    private navController: NavController,
    private platform: Platform,
    private menu: MenuController,
    ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(6666, () => {
      this.menu.close();
      this.navController.navigateForward('aarti-list');
    })
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
  

}
