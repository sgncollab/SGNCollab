import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, PopoverController } from '@ionic/angular';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { DataService } from 'src/app/services/data.service';
import { Md5 } from 'ts-md5/dist/md5';
import { UpdateUserPlaylistPageRoutingModule } from '../update-user-playlist/update-user-playlist-routing.module';

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
  isActiveToggleTextPassword: Boolean = true;
  showpass = false
  passwordToggle = 'eye';
  pinone;
  pintwo;
  pinReq = false;
  pinLen = false;
  pinreq = false;
  pinlen = false;
  otpCheck = false;
  otpnull = false;
  inputOTP;
  pinnotmatch = false;
  otp;
  

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
  // resetOtp(e) {
  //   this.otpLength = false;
  //   this.enableRegister = true;
  //   this.otpCheck =false;
  //   this.match = true;
  //   this.otpnull = false;
  //   //console.log(e.detail.value);
  //   if (e.detail.value == "" || e.detail.value == undefined) {
  //     this.otpnull = true;
  //     //console.log("enter otp");
  //   }
  //   // else if (e.detail.value.length > 4) {

  //   //   //this.otpLength = true;
  //   //   //console.log("please enter 4 digit pin");
  //   // }
  //   else {
  //     if (e.detail.value == localStorage.getItem('resetPin')) {
  //       this.match = false;
  //       console.log("Matched");
  //     }
  //     else {
  //       // this.otpCheck =true;
  //       // console.log("Please check OTP");
  //     }
  //   }
  // }
  // onOtpChange(event){
  //   console.log(event.detail.value);
  // }
  onOtpChange(event){
    this.otp =event
  }
  verifyOTP() {
    this.match = true;
    this.otpCheck = false;
    console.log("verified");
    if (this.otp == localStorage.getItem('resetPin')) {
      this.match = false;
    }
    else {
      this.otpCheck = true;
    }
  }
  resetPin(e, identifier) {
    this.enableRegister = true;
    this.pinReq = false;
    this.pinLen = false;
    this.pinreq = false;
    this.pinlen = false;
    this.pinnotmatch = false;

    if (identifier == 'reset') {
      if (e.detail.value == "" || e.detail.value == undefined) {
        this.pinReq = true;
        //console.log("pin required")
      }
      else if (e.detail.value.length != 4) {
        this.pinLen = true;
        //console.log("pin should be 4 digit only")
      }
      else {
        //console.log("pin is valid")
        this.pinone = e.detail.value
        if (this.pinone == this.pintwo) {
          this.enableRegister = false;
        }
        else {
          if (this.pintwo != undefined) {
            this.pinnotmatch = true;
          }
        }
      }
    }
    else if (identifier == 'confirm') {
      if (e.detail.value == "" || e.detail.value == undefined) {
        this.pinreq = true;
        //console.log("pin req.")
      }
      else if (e.detail.value.length != 4) {
        this.pinlen = true;
        //console.log("pin should be 4 digit only")
      }
      else {
        //console.log("pin is valid")
        this.pintwo = e.detail.value
        if (this.pinone == this.pintwo) {
          this.enableRegister = false;
        }
        else {
          this.pinnotmatch = true;
        }
      }
    }
  }

  onSubmit() {
    console.log(this.pinone, this.confirmPIN)
    if (this.pinone == this.confirmPIN) {
      this.Uname = this.dataService.getResetUname();
      this.regResult.filter(value => {
        if (this.Uname == value.name) {
          console.log(value.name)
          this.id = value.id;
          this.sr_no = value.sr_no;
        }
      })
      this.dbService.updatePin(this.id, this.sr_no, this.Uname, Md5.hashStr(this.confirmPIN));
      this.navCtrl.navigateForward('registration-login');
    }
    else {
      console.log("check PIN")
    }


  }

  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'number';
  }
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
    this.showpass = !this.showpass;
    if (this.passwordToggle == 'eye') {
      this.passwordToggle = 'eye-off';
    } else {
      this.passwordToggle = 'eye';
    }
  }

}
