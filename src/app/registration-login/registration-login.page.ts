import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, PopoverController } from '@ionic/angular';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { Md5 } from 'ts-md5/dist/md5';
import { AppComponent } from 'src/app/app.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ForgotPinPopoverComponent } from '../forgot-pin-popover/forgot-pin-popover.component'
import { DataService } from 'src/app/services/data.service';
//import { Network } from '@ionic-native/network/ngx';



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
  pattern = /^[0-9]+$/
  patternCheck=false;
  dataPage = "";
  temp
  unamenull = false;
  user;
  guest =false;
  view
  currentPage ="registration-login";
  //internet = true;
 

  constructor(
    private menu: MenuController,
    private screenOrientation: ScreenOrientation,
    private dbService: FirebaseDbService,
    private appComponent: AppComponent,
    private navCtrl: NavController,
    private popovercntrl: PopoverController,
    private dataService: DataService,
    //private network: Network,
   ) {
    // this.network.onDisconnect().subscribe(() => {
    //   this.internet = false;
    //   //alert('network was disconnected :-(');
    // });
    // this.network.onConnect().subscribe(() => {
    //   this.internet = true;
    //   //alert('network connected!');
      
    //   setTimeout(() => {
    //     if (this.network.type === 'wifi') {
    //       //alert('we got a wifi connection, woohoo!');
    //     }
    //   }, 3000);
    // });
  }
  
  async presentPopover(ev) {
    const popover = await this.popovercntrl.create({
      component: ForgotPinPopoverComponent,
      cssClass: 'ion-popover-1',
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

    
    
  }

  ionViewWillEnter() {
    this.dataService.setPresentPage(this.currentPage);
     
    this.user = this.dataService.getGuest();
    if(this.user == "guest"){
      this.guest = true;
      this.display = true;
    }
    
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
    this.dataPage = this.dataService.getPresentPage();
    if (this.dataPage == "reset-pin") {
      //console.log("coming from reset pin ");
      this.enterUName = "";
      this.enterPIN = "";
      this.rememberChecked = false;
      this.dbService.showToast("PIN reset successfully! Login with your new PIN ");

    } else {
      // console.log("else");
    }
    //console.log(this.screenOrientation.type); // log the current orientation, example: 'landscape'
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);  // set to landscape

  }
  ionViewDidLeave() {
    this.menu.enable(true);
    this.username="";
    this.confirmPIN= "";
  }
  inputValidation(e, identifier) {
    if (identifier == 'username') {
      this.uName = false;
      this.length = false;
      this.uNameExist = false;
      this.disabled = true;
      this.patternCheck= false;

      if (e.detail.value == "" || e.detail.value == undefined) {
        this.uName = true;
      }
      else if (e.detail.value.length < 4 || e.detail.value.length > 30) {
        this.length = true;
      }
      else if (this.pattern.test(String(e.detail.value))) {
           this.patternCheck= true;
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

  registerEnable() {
    if(this.username == "" || this.username == undefined ){
      this.uName = true;
    }
   else if (this.create == true && this.confirm == true) {
      this.disabled = false;
    }
  }
  register() {
    let internet =this.dataService.getInternetStatus();
    if(internet == true){
      let pin = Md5.hashStr(this.confirmPIN);
      this.dbService.createUser(this.srNo, this.username.toLowerCase(), pin);
      this.dataService.setUserType(this.username)
      this.appComponent.viewMenu(this.username);
      let serialNo = this.srNo;
      this.dataService.setLoggedInUserData(serialNo);
      this.dataService.setLoggedInUsername(this.username);
      this.navCtrl.navigateForward('aarti-list');
    }else{
      this.dbService.showToast("Kindly Check Your Internet Connecion!")
    }
    
  }

  login() {
    let internet =this.dataService.getInternetStatus();
    if(internet == true){
      this.loginPin = false;
      this.loginUname = false;
      let flag = this.regResult.filter(value => {
        if (this.enterUName.toLowerCase() == value.name) {
          //console.log(value.name, value.sr_no, value.pin);
          if (Md5.hashStr(this.enterPIN) == value.pin) {
            //console.log("pin matched");
            this.dataService.setLoggedInUserData(value.sr_no);
            this.dataService.setLoggedInUsername(value.name);
            this.dataService.setUserType(this.enterUName);
            this.appComponent.viewMenu(this.enterUName);
            this.navCtrl.navigateForward('aarti-list'); 
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
    }else{
      this.dbService.showToast("Kindly Check Your Internet Connecion!") 
    }
      
  }
  
  rememberMe(identifier, e) {
    if (identifier == "register") {
      if (e.currentTarget.checked) {
        localStorage.setItem('username', this.username);
        localStorage.setItem('pin', this.confirmPIN);
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
    this.dataService.setUserType("guest");
    this.appComponent.viewMenu("guest");
    if (identifier == "search") {
      this.navCtrl.navigateRoot('search-playlist');
    } else {
      this.navCtrl.navigateRoot('aarti-list');
    }
  }

  // menuChange(userType){
  //   this.events.publish('userType', userType);
  // }
}



