import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-aarti-preview-popover',
  templateUrl: './aarti-preview-popover.component.html',
  styleUrls: ['./aarti-preview-popover.component.scss'],
})
export class AartiPreviewPopoverComponent implements OnInit {
  aarti=[];

  constructor(
    private dataService: DataService,
    private popovercntrl: PopoverController
    ) { }

  ngOnInit() {
    this.aarti = this.dataService.getItem();
    //console.log(this.aarti);
    
  }
  close(){
    this.popovercntrl.dismiss();
  }

}
