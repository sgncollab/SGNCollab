import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';

@Component({
  selector: 'app-aarti-details',
  templateUrl: './aarti-details.page.html',
  styleUrls: ['./aarti-details.page.scss'],
})
export class AartiDetailsPage implements OnInit {
  aartiData: any;
  private data: any;
  lang = false;
  language = "";
  private aartiDetail: any;
  smallFont = "3vh";
  fontSize: number = 3;
  upperLimit = false;
  lowerLimit = false;

  constructor(
    private dataService: DataService,
    private dbService: FirebaseDbService,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave() {
    this.smallFont = "3vh";
  }

  ngOnInit() {
    this.aartiData = this.dataService.getData();
    this.data = this.dataService.getmyPlaylistArtilist();
    this.lang = this.dataService.getLang()
    this.aartiDetail = this.aartiData.marathiAarti.split("@")
  }
  changeFont(identifier) {
    if (identifier == "plus") {
      this.lowerLimit = false;
      if (this.fontSize == 4.5) {
        this.upperLimit = true;
      }
      else {
        this.upperLimit = false;
        this.fontSize = this.fontSize + 0.5;
        this.smallFont = (this.fontSize) + 'vh';
      }
    }
    else if (identifier == "minus") {
      this.upperLimit = false;
      if (this.fontSize == 2.5) {
        this.lowerLimit = true;
      }
      else {
        this.lowerLimit = false;
        this.fontSize = this.fontSize - 0.5;
        this.smallFont = (this.fontSize) + 'vh';
      }
    }
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
            position: 'top',
            cssClass: 'cssAccept',
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
            position: 'top',
            cssClass: 'cssAccept',
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
          duration: 1000,
          color: 'primary',
          position: 'top',
          cssClass: 'cssAccept',
        });
        toast.present();
      }
    }
    catch (exception) {
      exception;
    }
  }
}
