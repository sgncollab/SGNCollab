import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, PopoverController } from '@ionic/angular';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { Md5 } from 'ts-md5/dist/md5';
import { AppComponent } from 'src/app/app.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ForgotPinPopoverComponent } from '../forgot-pin-popover/forgot-pin-popover.component'
import { DataService } from 'src/app/services/data.service';
import { Network } from '@ionic-native/network/ngx';


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
  confirmPIN: any;
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
  loginPin = false;
  loginUname = false;
  rememberChecked = false;
  hideConfirmPin = true;
  pinone;
  pintwo;
  pinLen = false;
  create = false;
  confirm = false;
  pinnotmatch = false;
  pattern = /^[a-zA-Z]/
  dataPage = "";
  temp
  unamenull = false;
 

  constructor(
    private menu: MenuController,
    private screenOrientation: ScreenOrientation,
    private dbService: FirebaseDbService,
    private appComponent: AppComponent,
    private navCtrl: NavController,
    private popovercntrl: PopoverController,
    private dataService: DataService,
    private network: Network
    ) {
      this.network.onDisconnect().subscribe(() => {
        this.dbService.showToast("network was disconnected :-(");
        alert('network was disconnected :-('+ this.network.type);
      });

      this.network.onConnect().subscribe(() => {
        console.log('network connected!');
        this.dbService.showToast("network connected!");
        // We just got a connection but we need to wait briefly
         // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            alert('we got a wifi connection, woohoo!');
          }
        }, 3000);
      });
  }
  async presentPopover(ev) {
    const popover = await this.popovercntrl.create({
      component: ForgotPinPopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
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

    // getting remember me values if checked

  }

  ionViewWillEnter() {
    this.rememberChecked =false;
    this.enterUName = localStorage.getItem('username');
    this.enterPIN = localStorage.getItem('pin');
    if (this.enterUName != null && this.enterUName != undefined) {
      this.rememberChecked = true;
    }
    else {
      this.rememberChecked = false;
      this.enterUName = "";
      this.enterPIN = "";
    }

    this.menu.enable(false);
    console.log(this.dataPage = this.dataService.getPresentPage());
    if (this.dataPage == "reset-pin") {
      console.log("coming from reset pin ");
      //localStorage.clear();
      this.enterUName = "";
      this.enterPIN = "";
      this.rememberChecked = false;
      this.dbService.showToast("PIN reset successfully! Login with your new PIN ");

    } else {
      console.log("else");
    }


    //console.log(this.screenOrientation.type); // log the current orientation, example: 'landscape'
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);  // set to landscape

  }
  ionViewDidLeave() {
    this.menu.enable(true);
  }
  inputValidation(e, identifier) {
    if (identifier == 'username') {
      this.uName = false;
      this.length = false;
      this.uNameExist = false;
      this.disabled = true;
      

      if (e.detail.value == "" || e.detail.value == undefined) {
        this.uName = true;
      }
      else if (e.detail.value.length < 4 || e.detail.value.length > 30) {
        this.length = true;
      }
      else {
        let flag = this.regResult.filter(value => {
          if (value.name == e.detail.value.toLowerCase()) {
            return true;
          }
          return false;
        })
        if (flag.length == 0) {
         
          this.username = e.detail.value;
          this.registerEnable();
        }
        else {
          this.uNameExist = true;
        }

      }


    }
    else if (identifier == 'createpin') {
      this.pin1 = false;
      this.pinLength = false;
      this.pinValid = false;
      this.hideConfirmPin = true;
      this.pinnotmatch=false;
      this.create=false;
      this.disabled = true;
      
       
      if (e.detail.value == "" || e.detail.value == undefined) {
        this.pin1 = true;
      }
      else if (e.detail.value.length != 4) {
        this.pinLength = true;
      }
      else {
        this.pinValid = true;
        this.hideConfirmPin = false;
        this.pinone = e.detail.value;
        if (this.pinone == this.pintwo) {
          this.create = true;
          this.confirm = true;
          this.registerEnable();
        }
        else {
          if (this.pintwo != undefined) {
            this.pinnotmatch = true;
          }
        }
      }
    }
    else if (identifier == 'confirmpin') {
      this.pin2 = false;
      this.pinLen = false;
      this.confirm = false;
      this.pinnotmatch = false;
      this.disabled = true;
      
      if (e.detail.value == "" || e.detail.value == undefined) {
        this.pin2 = true;
      }
      else if (e.detail.value.length != 4) {
        this.pinLen = true;
      }
      else {
        this.pintwo = e.detail.value;
        if (this.pinone == e.detail.value) {
          this.confirm = true;
          this.create = true;
          this.registerEnable();
        }
        else {
          this.pinnotmatch= true;
          
        }

      }

    }
  }

  // uNameValidation(e) {
  //   this.uName = false;
  //   this.length = false;
  //   this.uNameExist = false;
  //   this.pinValid = false;
  //   this.disabled = true;

  //   //console.log(e.detail.value)
  //   if (e.detail.value == "" || e.detail.value == undefined) {
  //     this.uName = true;
  //     //console.log("username is required");
  //   }
  //   else if (e.detail.value.length < 4 || e.detail.value.length > 30) {
  //     this.length = true;
  //     //console.log("pl.check the length");
  //   }
  //   // else if (!this.pattern.test(String(e.detail.value))) {
  //   //   console.log("please input valid username")
  //   // }
  //   else {
  //     //console.log("Username is valid")
  // let flag = this.regResult.filter(value => {
  //   if (value.name == e.detail.value.toLowerCase()) {
  //     return true;
  //   }
  //   return false;
  // })
  //     //console.log(flag);
  //     if (flag.length == 0) {
  //       this.registerEnable();
  //       // if(this.pinone == this.pintwo == undefined && this.pinone == this.pintwo ){
  //       //   this.disabled = false;
  //       // }
  //       // console.log("register");
  //     }
  //     else {
  //       this.uNameExist = true;
  //       //console.log("username already taken!")
  //     }
  //   }

  // }

  // createPinInput(e) {

  //   this.pin1 = false;
  //   this.pinLength = false;
  //   this.pinValid = false;
  //   this.hideConfirmPin = true;
  //   this.disabled = true;
  //   this.create = false;
  //   this.pinnotmatch = false;

  // if (e.detail.value == "" || e.detail.value == undefined) {
  //   this.pin1 = true;
  //   //console.log("pin is required");
  // }
  // else if (e.detail.value.length != 4) {
  //   this.pinLength = true;
  //   //console.log("please enter 4 digit pin");
  // }
  //   else {
  //     //console.log("pin is valid");
  // this.pinValid = true;
  // this.hideConfirmPin = false;
  // this.pinone = e.detail.value;
  //     if (this.pinone == this.pintwo) {
  //       this.create = true;
  //       this.confirm = true;
  //       this.registerEnable();
  //       // this.disabled = false;
  //     }
  //     else {
  //       if (this.pintwo != undefined) {
  //         this.pinnotmatch = true;
  //       }
  //     }
  //   }
  // }
  // confirmPinInput(e) {

  //   this.pin2 = false;
  //   this.disabled = true;
  //   this.pinLen = false;
  //   this.match = false;
  //   this.confirm = false;
  //   this.pinnotmatch = false;


  // if (e.detail.value == "" || e.detail.value == undefined) {
  //   this.pin2 = true;
  //   //console.log("pin is required");
  // }
  // else if (e.detail.value.length != 4) {
  //   this.pinLen = true;
  //   //console.log("Please enter 4 digit pin")
  // }
  //   else {
  //     this.match = false;
  //     // this.pinMatched = false;
  //     //pin valid
  //     this.pintwo = e.detail.value;
  //     if (this.pinone == this.pintwo && this.username != "" && this.username != undefined) {
  //       this.confirm = true;
  //       this.create = true;
  //       this.registerEnable();
  //       //this.disabled = false;
  //     }
  //     else {
  //       this.pinnotmatch = true;
  //       console.log("username")
  //     }

  //   }

  // }


  registerEnable() {
    if(this.username == "" || this.username == undefined ){
      this.uName = true;

    }
 
   else if (this.create == true && this.confirm == true) {
      this.disabled = false;
    }


  }
  register() {
    console.log("register")
    let pin = Md5.hashStr(this.confirmPIN);
    this.dbService.createUser(this.srNo, this.username.toLowerCase(), pin);
    this.appComponent.viewMenu(this.username);
    let serialNo = this.srNo;
    this.dataService.setLoggedInUserData(serialNo);
    this.dataService.setLoggedInUsername(this.username);
    this.navCtrl.navigateForward('aarti-list');

    if (this.confirmPIN == this.createPIN) {
      console.log(this.confirmPIN);
      if (this.username == "" || this.username == undefined) {
        console.log("please enter usename");
      }

      else {
        console.log("register")
        let pin = Md5.hashStr(this.confirmPIN);
        this.dbService.createUser(this.srNo, this.username.toLowerCase(), pin);
        this.appComponent.viewMenu(this.username);
        let serialNo = this.srNo;
        this.dataService.setLoggedInUserData(serialNo);
        this.navCtrl.navigateForward('aarti-list');
      }

    }
    else {
      console.log("Check the pin ")
    }
  }

  login() {
    if (navigator.onLine) {
      //Do task when no internet connection
      this.loginPin = false;
      this.loginUname = false;
      let flag = this.regResult.filter(value => {
        if (this.enterUName.toLowerCase() == value.name) {
          //console.log(value.name, value.sr_no, value.pin);
          if (Md5.hashStr(this.enterPIN) == value.pin) {
            //console.log("pin matched");
            this.dataService.setLoggedInUserData(value.sr_no);
            this.dataService.setLoggedInUsername(value.name);
            this.navCtrl.navigateForward('aarti-list');
            this.appComponent.viewMenu(this.enterUName);
          }
          else {
            this.loginPin = true;
            //console.log("Please check your PIN")
          }
          return true;
        }
        return false;
      })
      if (flag == false) {
        this.loginUname = true;
        //console.log("Please check your username");
      }
    } else {
      this.dbService.showToast("Kindly check your Internet Connection!")
    }

  }
  rememberMe(identifier, e) {
    if (identifier == "register") {
      if (e.currentTarget.checked) {
        localStorage.setItem('username', this.username);
        localStorage.setItem('pin', this.confirmPIN);
        //  this.temp = Md5.hashStr(this.confirmPIN);
        //  console.log(this.temp);
        //  localStorage.setItem('pin',this.temp);
      }
      else {
        this.rememberChecked = false;
        localStorage.clear();
      }
    }
    else if (identifier == "login") {
      if (e.currentTarget.checked) {
        localStorage.setItem('username', this.enterUName);
        localStorage.setItem('pin', this.enterPIN);
      }
      else {
        this.rememberChecked = false;
        localStorage.clear();
      }
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
    return this.isActiveToggleTextPassword ? 'password' : 'tel';
  }

  displayMenu(identifier) {
    this.appComponent.viewMenu("guest");
    if (identifier == "search") {
      this.navCtrl.navigateRoot('search-playlist');
    } else {
      this.navCtrl.navigateRoot('aarti-list');
    }
  }
}



