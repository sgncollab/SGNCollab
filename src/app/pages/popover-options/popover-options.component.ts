import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';

@Component({
  selector: 'app-popover-options',
  templateUrl: './popover-options.component.html',
  styleUrls: ['./popover-options.component.scss'],
})
export class PopoverOptionsComponent implements OnInit {
  item=[];

  constructor(private dbService:FirebaseDbService, private dataService:DataService) { }

  ngOnInit() {
    this.dbService.showToast("hi")
    //this.item = this.dataService().
  }
  Edit(){

  }
  // Delete(){
  //   let count = 0;
  //   let id ="";
  //   for (let i=0 ;i<this.result.length;i++){
  //     if(item.playlist_id == this.result[i].playlist_id){
  //       count++;
  //     }
  //   }
  //   for(let j=0;j< this.listResult.length;j++){
  //     if(this.listResult[j].playlist_id == item.playlist_id){
  //       id = this.listResult[j].id;
  //     }
  //   }
  //   if(count > 1){
  //     this.dbService.deleteUserPlaylist(item.id)
  //   }else {
  //     this.dbService.deletePlaylist(id)
  //     this.dbService.deleteUserPlaylist(item.id)
  //   }
  //   this.dbService.showToast(item.playlist_name + " "+" Deleted!")
  // }
}
