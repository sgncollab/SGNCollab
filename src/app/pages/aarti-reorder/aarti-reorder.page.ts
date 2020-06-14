import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service'
import { PopoverController } from '@ionic/angular';
import { ReorderPopoverComponent } from '../reorder-popover/reorder-popover.component';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';

@Component({
  selector: 'app-aarti-reorder',
  templateUrl: './aarti-reorder.page.html',
  styleUrls: ['./aarti-reorder.page.scss'],
})
export class AartiReorderPage implements OnInit {
  private data: any;
  private selectedItems = [];
  userPlaylist = [];
  playlistName: string ="";
  srNo: any;
  currentPage = "";

  constructor(
    private dataService: DataService,
    private popovercntrl: PopoverController,
    private dbService: FirebaseDbService
    
  ) { }

  ngOnInit() {
    this.currentPage = ('aarti-reorder');
    fetch('./assets/data/aarti-data.json').then(res => res.json())
      .then(json => {
        this.data = json;
      });
    this.selectedItems = this.dataService.getAarti();
    //console.log(this.selectedItems);

    this.dbService.fetchUserPlaylist().subscribe((data) => {
      this.userPlaylist = data.map(value => {
        return {
          id: value.payload.doc.id,
          playlist_id: value.payload.doc.data()['playlist_id'],
          playlist_name: value.payload.doc.data()['playlist_name'],
          sr_no: value.payload.doc.data()['sr_no']
        }
      });
      //console.log(this.userPlaylist);
    });
    
    this.srNo = this.dataService.getLoggedInUserData();
    

  }

  reorderItems(event) {
    let itemToMove = this.selectedItems.splice(event.detail.from, 1)[0];
    this.selectedItems.splice(event.detail.to, 0, itemToMove);
    event.detail.complete(); //need to see
  }

  async presentPopover(ev) {
    const popover = await this.popovercntrl.create({
      component: ReorderPopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}

