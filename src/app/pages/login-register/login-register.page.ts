import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AppComponent } from 'src/app/app.component';
import {Md5} from 'ts-md5/dist/md5';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {
  userNameLog: any;
  mobNoLog: any;
  userName: any;
  mobNo: any;
  items: any = [];
  result: any = [];
  regResult = [];
  code: any;
  srNo = 1;
  signUpValidate: FormGroup;
  isChecked: boolean;
  view: string = "registerView";
  display = false;
  ext: any ="+91";
  someAutoFormattedInput = "";
  //currentPage  = "login-register";
  encryptedKey:any;
  key:any;
  countryCode:any;

  constructor(
    private menu: MenuController,
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private dbService: FirebaseDbService,
    private appComponent : AppComponent,
    private dataService: DataService,
    private screenOrientation: ScreenOrientation
  ) {
    this.signUpValidate = formBuilder.group({
      userName: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]+$')])], 
      code: ['', Validators.compose([Validators.required])],
      mobNo: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern('[0-9]{10}')])]
    });
    // this.code = this.signUpValidate.value.code;
    // this.userNameLog = this.signUpValidate.value.userName;
    // this.mobNoLog = this.signUpValidate.value.mobNo;
    
    
  }

  ionViewWillEnter() {
    this.menu.enable(false);
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
  ionViewDidLeave() {
    this.menu.enable(true);
  }


  ngOnInit() {
    console.log(this.screenOrientation.type);
    this.dbService.getCountryCode().subscribe((data) => {
      this.result = data.map(value => {
        return {
          id: value.payload.doc.id,
          code: value.payload.doc.data()['code'],
          country: value.payload.doc.data()['country'],
          selected: value.payload.doc.data()['selected']
        }
      });
      this.items = this.result;
      this.countryCode = this.items[1].code
    });

    this.dbService.fetchUsers().subscribe((data) => {
      this.regResult = data.map(value => {
        return {
          id: value.payload.doc.id,
          mobile_no: value.payload.doc.data()['mobile_no'],
          name: value.payload.doc.data()['name'],
          sr_no: value.payload.doc.data()['sr_no']
        }
      });
      //console.log(this.regResult);
      // handle null and undefined case
      
      if (this.regResult.length > 0 && this.regResult != undefined) {
        let oldSrNo = 1, newSrNo = 0;  //change naming convention
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
    });
    
    this.userNameLog = localStorage.getItem('username');
    this.mobNoLog = localStorage.getItem('mobno');
    this.ext = localStorage.getItem('extno'); 
  }

  registerUser() {
    //console.log(this.code, this.userNameLog,this.mobNoLog);
    var flag = false;
    this.someAutoFormattedInput = this.signUpValidate.value.userName ;
    console.log(this.someAutoFormattedInput);
    this.code = this.signUpValidate.value.code
    this.mobNo = this.signUpValidate.value.mobNo
    let mob = this.code + this.mobNo
    this.dataService.setRegisteredMobNo(mob);
    console.log("input register"+ mob);
    mob =  Md5.hashStr(mob);
    console.log("converted register"+mob);

    try {
      if (this.regResult.length > 0 && this.regResult != undefined) {
        for (let i = 0; i < this.regResult.length; i++) {
          if (this.regResult[i].mobile_no == mob ) {
            flag = true;
            this.dbService.showToast("User with this mobile number already exists");
            break;
          }
        }
      }
      if (flag == false) {
       // this.encryptedKey = Md5.hashStr(this.signUpValidate.value.code + this.signUpValidate.value.mobNo);
        // this.encryptedKey=AES.encrypt(this.signUpValidate.value.code + this.signUpValidate.value.mobNo,"")
        this.dbService.createUser(this.srNo, this.signUpValidate.value.userName, mob);
        this.rememberMe('register');
        this.appComponent.viewMenu(this.signUpValidate.value.userName);

        console.log("registered"+ mob)

        //let serialNo = this.dataService.setLoggedInUserData(this.srNo);
        let serialNo = this.srNo;
        //console.log(serialNo);
        this.dataService.setLoggedInUserData(serialNo);
        this.navCtrl.navigateForward('otp');//aarti-list
      }
    } catch (e) {
      this.dbService.showToast(e);
    }
  }

  login() {
    let count = 0;
    let flag = false;
    let usernameCount = [];
    let mno =( this.countryCode + this.mobNoLog)
    console.log(this.countryCode)
    console.log(this.mobNoLog)
    console.log("logininput"+ mno)
    mno = Md5.hashStr(mno);
    console.log("converted login " +mno)

    try {
      if (this.regResult.length > 0 && this.regResult != undefined) {
        for (let i = 0; i < this.regResult.length; i++) {
          if (this.userNameLog.toLowerCase() == this.regResult[i].name) {
            count++;
            usernameCount.push(this.regResult[i]);
          }
        }
        if (count >= 1) {
          if (usernameCount.length > 0 && usernameCount != undefined) {
            for (let i = 0; i < usernameCount.length; i++) {
              // this.key =  usernameCount[i].mobile_no;
              // console.log(this.key)
              // this.decryptedKey=AES.decrypt(usernameCount[i].mobile_no, "").toString(utf8);
              if ( mno == usernameCount[i].mobile_no) {
                flag = true;
                this.dbService.showToast("Login Successful!");
                this.rememberMe('login');
                this.dataService.setLoggedInUserData( usernameCount[i].sr_no);
                this.dataService.setLoggedInUsername( usernameCount[i].name);
                this.appComponent.viewMenu(usernameCount[i].name);
                this.navCtrl.navigateRoot('aarti-list');
                break;
              }
            }
          }
          if (flag == false) {
            this.dbService.showToast("Mobile number does not match. Please enter a valid mobile number!");
          }
        }
        if (count == 0) {
          this.dbService.showToast("Username does not match. Please enter a valid username!");
        }
      }
    }
    catch (exception) {
      exception;
    }
  }

  rememberMe(identifier) {
    if(identifier == "login"){
      if (this.isChecked) {
        localStorage.setItem('username', this.userNameLog);
        localStorage.setItem('mobno', this.mobNoLog);
        localStorage.setItem('extno', this.ext);
        
      }
    }
    else if(identifier){
      if(identifier == "register"){
        if (this.isChecked) {
              localStorage.setItem('username', this.signUpValidate.value.userName);
              localStorage.setItem('mobno', this.signUpValidate.value.mobNo);
              localStorage.setItem('extno',this.signUpValidate.value.code);
            }
      }
    }
  }
  
  checkView(identifier) {
    //this.display = false;
    if (identifier == "loginView") {
      this.display = false;
      this.view = "loginView";
    } else if (identifier == "registerView") {
      this.display = true;
      this.view = "registerView";
    }
  }

  displayMenu(identifier){
    this.appComponent.viewMenu("guest");
    if(identifier == "search"){
      this.navCtrl.navigateRoot('search-playlist');
    }else{
      this.navCtrl.navigateRoot('aarti-list');
    }
  }
}
