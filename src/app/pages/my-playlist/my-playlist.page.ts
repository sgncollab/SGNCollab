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
  listResult=[];
  data = [];
  srno: any;

  constructor(private dbService: FirebaseDbService, private dataService: DataService) { }

  ngOnInit() {
    this.dbService.fetchUserPlaylist().subscribe((data) => {
      this.result = data.map(value => {
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

    this.dbService.fetchPlaylist().subscribe((data) => {
      this.listResult = data.map(value => {
        return {
          id: value.payload.doc.id,
          playlist_id: value.payload.doc.data()['playlist_id'],
          playlist_name: value.payload.doc.data()['playlist']
        }
      });
      console.log(this.listResult);
    });
  }

  userDetail() {
    this.srno = this.dataService.getLoggedInUserData();
    for (let i = 0; i < this.result.length; i++) {
      console.log(this.result[i].sr_no);
      if (this.srno == this.result[i].sr_no) {
        console.log(this.srno);
        this.data.push(this.result[i]);
        console.log(this.data);
      }
    }
  }
}
