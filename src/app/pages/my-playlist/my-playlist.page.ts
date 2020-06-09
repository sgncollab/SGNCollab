import { Component, OnInit } from '@angular/core';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.page.html',
  styleUrls: ['./my-playlist.page.scss'],
})
export class MyPlaylistPage implements OnInit {
  result = [];
  resultp = [];
  data = [];
  srno:any;

  constructor(private dbService:FirebaseDbService, private dS:DataService) { }

  ngOnInit() {
    this.dbService.fetchPlaylist().subscribe((data) => {
      this.resultp = data.map(value => {
        return {
          id: value.payload.doc.id,
          playlist_id: value.payload.doc.data()['playlist_id'],
          playlist_name: value.payload.doc.data()['playlist_name'],
          sr_no: value.payload.doc.data()['sr_no'] 
        }
      });
     // console.log(this.resultp.length);
      this.userDetail();
    });
  }

  userDetail(){
    this.srno = this.dS.getLoggedInUserData();
    for(let i = 0; i< this.resultp.length; i++){
      console.log(this.resultp[i].sr_no);
      if(this.srno == this.resultp[i].sr_no){
        console.log(this.srno);
        this.data.push(this.resultp[i]);
        console.log(this.data);
      }
    }
  }
}
