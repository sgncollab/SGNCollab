import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-aarti-details',
  templateUrl: './aarti-details.page.html',
  styleUrls: ['./aarti-details.page.scss'],
})
export class AartiDetailsPage implements OnInit {
  private aartiData: any;
  private data: any;

  constructor(
    private dataService: DataService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    fetch('./assets/data/aarti-data.json').then(res => res.json())
      .then(json => {
        this.data = json;
      });
    this.aartiData = this.dataService.getData();
  }

  async onNextPrev(identifier) {
    let index: any;
    
    try {
      index = this.dataService.getIndex();
      if (identifier == 'prev') {
        if (index > 0)
          index = index - 1;
        else {
          const toast = await this.toastController.create({
            message: 'No aarti available',
            duration: 2000,
            color: 'primary',
            position: 'bottom'
          });
          toast.present();
        }
      }
      else {
        if (index < this.data.length) {
          index = index + 1;
        }
        else {
          const toast = await this.toastController.create({
            message: 'No next aarti available',
            duration: 2000,
            color: 'primary',
            position: 'bottom'
          });
          toast.present();
        }
      }
      if (index < this.data.length) {
        this.aartiData = this.data[index]
        this.dataService.setIndex(index)
      }
      else {
        const toast = await this.toastController.create({
          message: 'No next aarti available',
          duration: 2000,
          color: 'primary',
          position: 'bottom'
        });
        toast.present();
      }
    }
    catch (exception) {
      exception;
    }
  }
}
