import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, PopoverController } from '@ionic/angular';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { DataService } from 'src/app/services/data.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-reset-pin',
  templateUrl: './reset-pin.page.html',
  styleUrls: ['./reset-pin.page.scss'],
})
export class ResetPinPage implements OnInit {
  resetPIN
  confirmPIN;
  match = true;
  otpLength = false;
  optValid = false;
  pin1 = false;
  pinLength = false;
  pin2 = false;
  enableRegister = true;
  regResult;
  Uname;
  id;
  sr_no;

  constructor(
    private navCtrl: NavController,
    private dbService: FirebaseDbService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dbService.fetchUsers().subscribe((data) => {
      this.regResult = data.map(value => {
        return {
          id: value.payload.doc.id,
          pin: value.payload.doc.data()['pin'],
          name: value.payload.doc.data()['name'],
          sr_no: value.payload.doc.data()['sr_no']
        }
      });
    })
  }
  resetOtp(e) {
    this.otpLength = false;
    //console.log(e.detail.value);
    if (e.detail.value == "" || e.detail.value == undefined) {
      console.log("enter otp");
    }
    else if (e.detail.value.length != 4) {
      this.otpLength = true;
      //console.log("please enter 4 digit pin");
    }
    else {
      this.match = true;
      if (e.detail.value == localStorage.getItem('resetPin')) {
        this.match = false;
        console.log("Matched");
      }
      else {

        console.log("Please check OTP");
      }
    }
  }
  resetPin(e) {
    this.pin1 = false;
    if (e.detail.value == "" || e.detail.value == undefined) {
      this.pin1 = true
    }
    else if (e.detail.value.length != 4) {
      this.pinLength = true;
    }
    else {
      //pin valid
    }

  }
  confirmResetPin(e) {
    console.log(this.resetPIN, this.confirmPIN)
    this.enableRegister = true;
    this.pin2 = false;
    if (e.detail.value == "" || e.detail.value == undefined) {
      this.pin2 = true
    }
    else if (this.resetPIN == this.confirmPIN) {
      this.enableRegister = false;
    }


  }
  onSubmit() {
    //update pin in database and navigate to login page
    this.Uname = this.dataService.getResetUname();
    this.regResult.filter(value => {
      if (this.Uname == value.name) {
        console.log(value.name)
        this.id = value.id;
        this.sr_no = value.sr_no;
        
      }
    })
    this.dbService.updatePin(this.id,this.sr_no,this.Uname,Md5.hashStr(this.confirmPIN));
    this.navCtrl.navigateForward('registration-login');
  }

}
