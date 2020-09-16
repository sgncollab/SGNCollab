import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';


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
  pinMatched=false;
  pin1 = false;
  pin2 = false;
  pinLength = false;
  match =false;
  disabled =true;
  
  isActiveToggleTextPassword: Boolean = true;

  constructor(private dbService: FirebaseDbService,private navCtrl: NavController,) {
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
    this.uNameExist =false;

    //console.log(e.detail.value)
    if (e.detail.value == "" || e.detail.value == undefined) {
      this.uName = true;
      //console.log("username is required");
    }
    else if (e.detail.value.length < 4 || e.detail.value.length > 30) {
      this.length = true;
      //console.log("pl.check the length");
    }
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
        this.uNameExist =false;
       // console.log("register");
      }
       else {
        this.uNameExist =true;
        //console.log("username already taken!")
      }
    }
  }

  createPinInput(e) {
    this.pin1 = false;
    this.pinLength = false;
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
    }
  }
  confirmPinInput(e) {
    this.pin2 =false;
    this.match = false;
    this.disabled =true;
   
    if (e.detail.value == "" || e.detail.value == undefined) {
      this.pin2 = true;
      //console.log("pin is required");
    }
    else if (this.confirmPIN == this.createPIN) {
      this.pinMatched = true;
      this.disabled =false;
      //console.log("pin matched");
    }
    else {
      this.match = true;
      this.pinMatched = false;
      //console.log("pin does not match!")
    }
  }
  
  

  register() {
    //console.log(this.createPIN)
    //console.log(this.confirmPIN);
    if (this.username != "" && this.createPIN != null && this.confirmPIN != null && this.username != undefined && 
    this.createPIN != undefined && this.confirmPIN != undefined && this.pinMatched == true) {
      this.dbService.createUser(this.srNo, this.username.toLowerCase(),this.confirmPIN )
      this.navCtrl.navigateForward('aarti-list');
    }
    else{
      console.log("Please enter all the details")
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
