import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service'
import { PopoverController } from '@ionic/angular';
import { ReorderPopoverComponent } from '../reorder-popover/reorder-popover.component';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { ActivatedRoute } from '@angular/router';
import { UpdatePopoverComponent } from '../update-popover/update-popover.component';

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
  dataPage = "";
  item=[];
  //lang = false;
  selectedLang;

  constructor(
    private dataService: DataService,
    private popovercntrl: PopoverController,
    private dbService: FirebaseDbService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.selectedLang = this.dataService.getLang();
    // console.log(this.selectedLang);
    this.dataPage = this.dataService.getPresentPage();
    this.selectedItems = this.dataService.getAarti();
    //console.log("selected items="+this.selectedItems)
    this.item =this.dataService.getSelectedPlaylistItem();
    this.dbService.fetchUserPlaylist().subscribe((data) => {
      this.userPlaylist = data.map(value => {
        return {
          id: value.payload.doc.id,
          playlist_id: value.payload.doc.data()['playlist_id'],
          playlist_name: value.payload.doc.data()['playlist_name'],
          sr_no: value.payload.doc.data()['sr_no']
        }
      });
    });
    
    this.srNo = this.dataService.getLoggedInUserData();
  }
  // displayLang() {
  //   this.lang = !this.lang;
  // }

  reorderItems(event) {
    let itemToMove = this.selectedItems.splice(event.detail.from, 1)[0];
    this.selectedItems.splice(event.detail.to, 0, itemToMove);
    event.detail.complete(); 
  }

  // async presentPopover(ev){
  //   const popover = await this.popovercntrl.create({
  //           component: ReorderPopoverComponent,
  //           cssClass: 'my-custom-class',
  //           event: ev,
  //           translucent: true
  //         });
  //         return await popover.present();
  //       } 
      

    

  
  
  async presentPopover(ev) {
    console.log(this.dataPage);
    if(this.dataPage == "my-playlist"){
      
      const popover = await this.popovercntrl.create({
        component: UpdatePopoverComponent,
        cssClass: 'my-custom-class',
        event: ev,
        translucent: true
      });
      return await popover.present();
    }else {
      const popover = await this.popovercntrl.create({
        component: ReorderPopoverComponent,
        cssClass: 'my-custom-class',
        event: ev,
        translucent: true
      });
      return await popover.present();
    } 
  }
}

