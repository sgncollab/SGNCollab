import { Component, OnInit } from '@angular/core';
import { FirebaseDbService } from 'src/app/services/firebase-db.service'
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  name: any;
  number: any;
  srNo = 12;
  //private userData: any;
  data: any;
  regResult = [];

  constructor(public dbService:FirebaseDbService, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.dbService.fetchUsers().subscribe((data) => {

      this.regResult = data.map(value => {
        return {
          id:value.payload.doc.id,
          mobile_no:value.payload.doc.data()['mobile_no'],
          name:value.payload.doc.data()['name'],
          sr_no:value.payload.doc.data()['sr_no']
        }
      });
      console.log(this.regResult);
    });
  }

  onSubmit() {
    this.dbService.createUser(this.srNo, this.name, this.number); //calling a method
    //console.log(this.Name + this.Number);
}
}
