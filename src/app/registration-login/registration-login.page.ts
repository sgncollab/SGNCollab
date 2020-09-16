import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-registration-login',
  templateUrl: './registration-login.page.html',
  styleUrls: ['./registration-login.page.scss'],
})
export class RegistrationLoginPage implements OnInit {
  regResult: any;
  uName = false;
  length = false;
  uNameExist = false;
  passwordToggle = 'eye';
  showpass = false
  display = false;
  createPIN: number;
  confirmPIN: number;
  username: any;
  srNo = 1;
  pinMatched = false;
  pin1 = false;
  pin2 = false;
  pinLength = false;
  match = false;
  pinValid = false;
  regError = false;
  disabled = true;
  isActiveToggleTextPassword: Boolean = true;
  enterUName;
  enterPIN;
  uvalid=false;

  constructor(private dbService: FirebaseDbService, private navCtrl: NavController,) {
  }

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
      console.log(this.regResult);
      if (this.regResult.length > 0 && this.regResult != undefined) {
        let oldSrNo = 1, newSrNo = 0;
        for (var i = 0; i < this.regResult.length; i++) {
          newSrNo = this.regResult[i].sr_no;
          if (newSrNo > oldSrNo) {
            oldSrNo = newSrNo;
          }
          this.srNo = oldSrNo + 1;
        }
      }
      else if (this.regResult.length == 0) {
        this.srNo = 1;
      }
    })

  }

  uNameValidation(e) {
    this.uName = false;
    this.length = false;
    this.uNameExist = false;
    this.pinValid = false;

    //console.log(e.detail.value)
    if (e.detail.value == "" || e.detail.value == undefined) {
      this.uName = true;
      //console.log("username is required");
    }
    else if (e.detail.value.length < 4 || e.detail.value.length > 30) {
      this.length = true;
      //console.log("pl.check the length");
    }
    // else if (e.detail.value.match("[a-zA-Z0-9]")) {

    // }
    else {
      //console.log("Username is valid")
      

      let flag = this.regResult.filter(value => {
        if (value.name == e.detail.value.toLowerCase()) {
          return true;
        }
        return false;
      })
      //console.log(flag);
      if (flag.length == 0) {
        this.uNameExist = false;
        this.uvalid=true;
        // console.log("register");
      }
      else {
        this.uNameExist = true;
        //console.log("username already taken!")
      }
    }
  }

  createPinInput(e) {
    this.pin1 = false;
    this.pinLength = false;
    this.pinValid = false;
    //console.log(e.detail.value);
    if (e.detail.value == "" || e.detail.value == undefined) {
      this.pin1 = true;
      //console.log("pin is required");
    }
    else if (e.detail.value.length != 4) {
      this.pinLength = true;
      //console.log("please enter 4 digit pin");
    }
    else {
      //console.log("pin is valid");
      this.pinValid = true;
    }
  }
  confirmPinInput(e) {
    this.pin2 = false;
    this.match = false;
    this.disabled = true;

    if (e.detail.value == "" || e.detail.value == undefined) {
      this.pin2 = true;
      //console.log("pin is required");
    }
    else if (this.confirmPIN == this.createPIN) {
      this.pinMatched = true;
      this.enableRegister();
      //console.log("pin matched");
    }
    else {
      this.match = true;
      this.pinMatched = false;
      //console.log("pin does not match!")
    }
  }
  enableRegister() {
    if (this.uvalid && this.pinValid  && this.pinMatched == true) {
      this.disabled = false;
    }
  }
  register() {
    this.regError = false;
    //console.log(this.createPIN)
    //console.log(this.confirmPIN);
  
    if (this.username != "" && this.createPIN != null && this.confirmPIN != null && this.username != undefined &&
      this.createPIN != undefined && this.confirmPIN != undefined && this.pinMatched == true) {
      this.dbService.createUser(this.srNo, this.username.toLowerCase(), this.confirmPIN)
      this.navCtrl.navigateForward('aarti-list');
    }
    else {
      this.regError = true;
      //console.log("Please enter all the details")
    }
  }

  login(){
    console.log(this.enterUName,this.enterPIN);
    let flag = this.regResult.filter(value =>{
      if(this.enterUName.toLowerCase() == value.name){
        console.log(value.name,value.sr_no,value.pin);
        if(this.enterPIN == value.pin){
          console.log("pin matched");
        }
        else{
          console.log("please check your PIN")
        }
        //console.log("username present");
        return true;
        
      }
      return false;
    })
    if(flag == false){
      console.log("please check your username");
    }
    else if(flag == true){
    this.enterPIN = Md5.hashStr(this.enterPIN);
    console.log(this.enterPIN);
    }
  }
  


  checkView(identifier) {
    if (identifier == "loginView") {
      this.display = false;
    }
    else if (identifier == "registerView") {
      this.display = true;
    }
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

  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'number';
  }
}

// tcknOnInputChange(e){        
//   // e.detail.keyup(function() {
//   //    e.detail.value(this.value.match(/[0-9]*/));
//   // });
// }
